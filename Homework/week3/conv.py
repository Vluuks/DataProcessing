from collections import OrderedDict
import csv
with open('test.csv','r') as f:
    reader = csv.reader(f)
    headerlist = next(reader)
    csvlist = []
    for row in reader:
            d = OrderedDict()
            for i, x in enumerate(row):
                    d[headerlist[i]] = x
            csvlist.append(d)

import json
with open('test.json','w') as f:
    json.dump(csvlist,f)