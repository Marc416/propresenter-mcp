import json

# Read the swagger.json file
with open('./swagger.json', 'r') as f:
    swagger = json.load(f)

# Get all paths
paths = swagger.get('paths', {})

# Find all endpoints with multiple HTTP methods
endpoints_with_multiple_methods = []

for path, methods in paths.items():
    # Filter out non-HTTP method keys (like 'parameters')
    http_methods = [key.upper() for key in methods.keys() if key.lower() in ['get', 'post', 'put', 'delete', 'patch', 'options', 'head']]
    
    if len(http_methods) > 1:
        endpoints_with_multiple_methods.append({
            'path': path,
            'methods': sorted(http_methods)
        })

# Sort by path for better readability
endpoints_with_multiple_methods.sort(key=lambda x: x['path'])

# Print results
print(f"Found {len(endpoints_with_multiple_methods)} endpoints with multiple HTTP methods:\n")
for endpoint in endpoints_with_multiple_methods:
    print(f"Path: {endpoint['path']}")
    print(f"Methods: {', '.join(endpoint['methods'])}")
    print()