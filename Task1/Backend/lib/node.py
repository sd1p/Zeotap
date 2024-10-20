class Node:
    def __init__(self, node_type, left=None, right=None, value=None):

        self.node_type = node_type 
        self.left = left            
        self.right = right          
        self.value = value         

    def to_dict(self):
        if self.node_type == 'operator':
            return {
                'type': 'operator',
                'value': self.value,
                'left': self.left.to_dict() if self.left else None,
                'right': self.right.to_dict() if self.right else None
            }
        elif self.node_type == 'operand':
            return {
                'type': 'operand',
                'value': self.value
            }

    def evaluate(self, context):

        if self.node_type == 'operand':
            if self.value in context:
                return context[self.value]
            else:
                return self.value

        if self.node_type == 'operator':
            left_value = self.left.evaluate(context) if self.left else None
            right_value = self.right.evaluate(context) if self.right else None

            if self.value == '>':
                return int(left_value) > int(right_value)
            elif self.value == '<':
                return int(left_value) < int(right_value)
            elif self.value == '=':
                return left_value == right_value
            elif self.value == '!=':
                return left_value != right_value
            elif self.value == 'AND':
                return bool(left_value) and bool(right_value)
            elif self.value == 'OR':
                return bool(left_value) or bool(right_value)

    def print_ast(self, level=0):
        """Recursively print the AST in a readable format."""
        indent = '  ' * level
        if self.node_type == "operator":
            print(f"{indent}Operator: {self.value}")
            if self.left:
                self.left.print_ast(level + 1)
            if self.right:
                self.right.print_ast(level + 1)
        elif self.node_type == "operand":
            print(f"{indent}Operand: {self.value}")

