from .node import Node
import re

class RuleParser:
    def __init__(self, rule):
        self.tokens = self.tokenize(rule)
        self.pos = 0

        self.validate_parentheses()

    def tokenize(self, rule):
        """Tokenize the rule string based on operators, numbers, strings, etc."""
        token_pattern = r"\s*(\(|\)|[<>!=]+|AND|OR|=|[0-9]+|'[^']*'|[a-zA-Z_][a-zA-Z0-9_]*)\s*"
        tokens = re.findall(token_pattern, rule)
        tokens = [token.strip("'\"") for token in tokens if token]
        return tokens

    def validate_parentheses(self):
        """Pre-check for matching parentheses before parsing."""
        paren_count = 0
        for token in self.tokens:
            if token == '(':
                paren_count += 1
            elif token == ')':
                paren_count -= 1
            if paren_count < 0:
                raise ValueError("Mismatched parentheses: Unmatched closing parenthesis found")
        
        if paren_count > 0:
            raise ValueError("Mismatched parentheses: Unmatched opening parenthesis")

    def parse(self):
        """Parse the rule and return the AST root node."""
        ast = self.expression()
        return ast

    def expression(self):
        """Parse an expression with AND/OR operators."""
        node = self.term()

        while self.current_token() in ('AND', 'OR'):
            operator = self.current_token()
            self.next_token()
            right_node = self.term()

            if right_node is None:
                raise ValueError(f"Missing operand after '{operator}'")

            node = Node(node_type='operator', left=node, right=right_node, value=operator)

        return node

    def term(self):
        """Parse a term with comparison operators."""
        node = self.factor()

        while self.current_token() in ('>', '<', '=', '!='):
            operator = self.current_token()
            self.next_token()
            right_node = self.factor()

            if right_node is None:
                raise ValueError(f"Missing operand after '{operator}'")

            node = Node(node_type='operator', left=node, right=right_node, value=operator)

        return node

    def factor(self):
        """Parse a factor, which can be an expression in parentheses or a number/string."""
        current = self.current_token()

        if current == '(':
            self.next_token()  # Skip '('
            node = self.expression()

            if self.current_token() != ')':
                raise ValueError("Missing closing parenthesis")
            self.next_token()  # Skip ')'
            return node

        if current is None:
            raise ValueError("Unexpected end of input")

        value = self.current_token()
        self.next_token()  # Move to the next token
        return Node(node_type='operand', value=value)

    def current_token(self):
        """Return the current token."""
        if self.pos < len(self.tokens):
            return self.tokens[self.pos]
        return None

    def next_token(self):
        """Advance to the next token."""
        self.pos += 1






