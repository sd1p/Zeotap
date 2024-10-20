import unittest
from lib.rule_engine import create_rule, combine_rules
from lib.json_to_ast import json_to_ast

class TestRuleEngine(unittest.TestCase):

    def test_create_rule(self):
        rule = "age > 30"
        expected_ast = {
            "type": "operator",
            "value": ">",
            "left": {
                "type": "operand",
                "value": "age"
            },
            "right": {
                "type": "operand",
                "value": "30"
            }
        }
        ast = create_rule(rule)
        self.assertEqual(ast, expected_ast)

    def test_combine_rules(self):
        rules = [
            "age > 30",
            "department = 'Marketing'"
        ]
        combined_ast = combine_rules(rules)
        expected_combined_ast = {
            "type": "operator",
            "value": "AND",
            "left": {
                "type": "operator",
                "value": ">",
                "left": {
                    "type": "operand",
                    "value": "age"
                },
                "right": {
                    "type": "operand",
                    "value": "30"
                }
            },
            "right": {
                "type": "operator",
                "value": "=",
                "left": {
                    "type": "operand",
                    "value": "department"
                },
                "right": {
                    "type": "operand",
                    "value": "Marketing"
                    }
                }
            }
        self.assertEqual(combined_ast, expected_combined_ast)

    def test_evaluate_rule(self):
        ast = {
            "type": "operator",
            "value": "AND",
            "left": {
                "type": "operator",
                "value": ">",
                "left": {
                    "type": "operand",
                    "value": "age"
                },
                "right": {
                    "type": "operand",
                    "value": "30"
                }
            },
            "right": {
                "type": "operator",
                "value": "=",
                "left": {
                    "type": "operand",
                    "value": "department"
                },
                "right": {
                    "type": "operand",
                    "value": "Marketing"
                }
            }
        }
        context = {
            "age": 35,
            "department": "Marketing"
        }
        ast_node = json_to_ast(ast)
        result = ast_node.evaluate(context)
        self.assertTrue(result)

        context = {
            "age": 25,
            "department": "Sales"
        }
        result = ast_node.evaluate(context)
        self.assertFalse(result)

if __name__ == '__main__':
    unittest.main()