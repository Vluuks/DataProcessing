#!/usr/bin/env python
# Name:
# Student number:
'''
This script scrapes IMDB and outputs a CSV file with highest rated tv series.
'''
import csv
from pattern.web import URL, DOM, Element

# to avoid unicode errors 
import sys
reload(sys)
sys.setdefaultencoding('utf-8')

# constants
TARGET_URL = "http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series"
BACKUP_HTML = 'tvseries.html'
OUTPUT_CSV = 'tvseries.csv'


def extract_tvseries(dom):

    # access elements
    body = dom.body
    element = Element(body)
    elementlist = element.by_class("lister-item mode-advanced");

    # init list to store data
    completelist = []
    
    # iterate over elements in the list
    for element in elementlist:

        # iterate over every list item in the list of top tv series
        for listitem in element.by_class("lister-item-content"):

            # (re)init list
            infolist = []

            # title
            title = listitem.by_tag('a')[0]
            infolist.append(title.content)
            
            # rating
            rating = listitem.by_class('inline-block ratings-imdb-rating')[0]
            infolist.append(rating.attrs['data-value'])
    
            # genre
            genre = listitem.by_class('genre')[0]
            infolist.append(genre.content.strip())
            
            # actors
            actorsdiv = listitem.by_tag('p')[2]
            actors = ""
  
            # iterate over actors and add to string
            for actor in actorsdiv.by_tag('a'):
                actors += actor.content + ", "

            infolist.append(actors[:-2])
            
            #runtime
            runtime = listitem.by_class('runtime')[0]

            if runtime.content is not None:
                infolist.append(runtime.content[:-4])
            else:
                infolist.append("N/A")
            
            # for every listitem, append to  list of lists
            completelist.append(infolist)
 
    return completelist 


def save_csv(f, tvseries):
    '''
    Output a CSV file containing highest rated TV-series.
    '''
    writer = csv.writer(f)
    writer.writerow(['Title', 'Rating', 'Genre', 'Actors', 'Runtime'])
    
    #iterate over lists of data in tvseries and write
    for item in tvseries:
        writer.writerow(item)


if __name__ == '__main__':
    # Download the HTML file
    url = URL(TARGET_URL)
    html = url.download()

    # Save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # Parse the HTML file into a DOM representation
    dom = DOM(html)

    # Extract the tv series (using the function you implemented)
    tvseries = extract_tvseries(dom)

    # Write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'wb') as output_file:
        save_csv(output_file, tvseries)