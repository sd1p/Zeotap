from create_rule import RuleParser
import json

context = {
    'age': 35,
    'department': 'Marketing',
    'salary': 60000,
    'experience': 6
}

# ATTRIBUTE_CATALOGUE = {
#     'age': 'integer',
#     'department': 'string',
#     'salary': 'integer',
#     'experience': 'integer',
# }

def create_rule(rule: str):
    try:
        parser = RuleParser(rule)
        ast = parser.parse()
        
        ast.print_ast()

        # for token in parser.tokens:
        #     if token in ATTRIBUTE_CATALOGUE:
        #         expected_type = ATTRIBUTE_CATALOGUE[token]
        #         if expected_type == 'integer' and not isinstance(context[token], int):
        #             raise ValueError(f"Attribute '{token}' should be of type {expected_type}.")
        #         if expected_type == 'string' and not isinstance(context[token], str):
        #             raise ValueError(f"Attribute '{token}' should be of type {expected_type}.")
        
        result = ast.evaluate(context)
        print(f"Evaluation result: {result}")

        return json.dumps(ast.to_dict(), indent=2)
    
    except ValueError as ve:
        print(f"ValueError: {ve}")
        return json.dumps({"error": str(ve)})
    
    except Exception as e:
        print(f"An error occurred while processing the rule: {e}")
        return json.dumps({"error": "An error occurred while processing the rule.", "details": str(e)})


rule = "((age > 30 AND department = 'Marketing') OR (salary > 50000 AND experience > 5))"

create_rule(rule)
