import json, re, unicodedata

with open("./french.json") as file :
    french = json.loads(file.read())


def norm(s):
    return ''.join(c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != "Mn")

cleanedfrench = []

rule = r"^(?!.*-).*$"
for i in french:
    if re.match(rule, i):
        cleanedfrench.append(norm(i))


with open("./cleanedfrench.json", "w") as file:
    file.write(json.dumps(cleanedfrench))
