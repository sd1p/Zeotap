from .create_rule import RuleParser


def create_rule(rule: str):
    try:
        parser = RuleParser(rule)
        ast = parser.parse()
        return ast.to_dict()
    
    except ValueError as ve:
        return {"error": str(ve)}
    
    except Exception as e:
        return {"error": "An error occurred while processing the rule.", "details": str(e)}
    
    
def combine_rules(rules: list):
    combined_rule = " AND ".join(f"({rule})" for rule in rules)
    return create_rule(combined_rule)