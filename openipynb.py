import json
import pickle

with open("status20210707.ipynb", 'r') as f:
    data_str = ""
    for i in f.readlines():
        data_str += i
    data = json.loads(data_str)

cells = data["cells"]
source_code = ""
for cell in cells:
    if cell["cell_type"] == "code":
        count = cell["execution_count"]
        if not count:
            continue
        source_code += f"\n## In[{count}]\n"
        for code in cell["source"]:
            source_code += code
        source_code += '\n'

print(source_code)
