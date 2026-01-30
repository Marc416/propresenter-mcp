import json

# Read the swagger.json file
with open('swagger.json', 'r') as f:
    swagger = json.load(f)

# Get all paths
paths = swagger.get('paths', {})

# Find all endpoint-method combinations
endpoint_methods = []

for path, methods in paths.items():
    # Filter out non-HTTP method keys (like 'parameters')
    for method_key in methods.keys():
        if method_key.lower() in ['get', 'post', 'put', 'delete', 'patch', 'options', 'head']:
            method_upper = method_key.upper()
            summary = methods[method_key].get('summary', 'No description')
            endpoint_methods.append({
                'method': method_upper,
                'path': path,
                'summary': summary
            })

# Sort by path, then by method
endpoint_methods.sort(key=lambda x: (x['path'], x['method']))

# Extract parent group from path (e.g., /v1/prop/{id} -> /v1/prop)
def get_parent_group(path):
    parts = path.split('/')
    if len(parts) >= 3:
        # Handle paths like /v1/prop, /v1/prop/{id}, /v1/prop_collection, etc.
        # Take first non-empty, non-v1 segment that doesn't contain {
        for i, part in enumerate(parts):
            if part and part != 'v1' and '{' not in part:
                group_path = '/'.join(parts[:i+1])
                # Normalize singular/plural by removing trailing 's' if present
                group_parts = group_path.split('/')
                last_part = group_parts[-1]
                # Handle special case: "ies" -> "y" (e.g., libraries -> library)
                if last_part.endswith('ies') and len(last_part) > 3:
                    group_parts[-1] = last_part[:-3] + 'y'
                # Handle regular plural: remove trailing 's' (but not 'ss')
                elif last_part.endswith('s') and len(last_part) > 1:
                    if not last_part.endswith('ss'):
                        group_parts[-1] = last_part[:-1]
                return '/'.join(group_parts)
    return path

# Print markdown header
print(f"# ProPresenter API Endpoints\n")
print(f"Total: {len(endpoint_methods)} endpoint-method combinations\n")

# Group endpoints by parent group
current_group = None
group_number = 0
items_in_group = []

for endpoint in endpoint_methods:
    parent_group = get_parent_group(endpoint['path'])
    
    if parent_group != current_group:
        # Print previous group
        if items_in_group:
            print(f"## Group {group_number}: `{current_group}`\n")
            for idx, item in enumerate(items_in_group, 1):
                print(f"### {group_number}.{idx} `{item['method']}` `{item['path']}`")
                print(f"_{item['summary']}_\n")
        
        # Start new group
        group_number += 1
        current_group = parent_group
        items_in_group = [endpoint]
    else:
        items_in_group.append(endpoint)

# Print last group
if items_in_group:
    print(f"## Group {group_number}: `{current_group}`\n")
    for idx, item in enumerate(items_in_group, 1):
        print(f"### {group_number}.{idx} `{item['method']}` `{item['path']}`")
        print(f"_{item['summary']}_\n")