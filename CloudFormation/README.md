# Project Animal Adoption

Husky Shelters is an animal adoption agency. They operate globally with the goal of
providing shelter and hapiness to stray dogs and cats.

## Data migration

Husky Shelters mantains a record for each animal they have, they store their health
status, age, location and a collection of pictures. This information is mantained by
their personnel, They have this information in spreadsheets and there is a different
spreadsheet for each region they operate on. Husky Shelters needs to copy this
information to the Cloud.

They also have their pictures locally stored for each region they operate on, they also
want to copy it to the Cloud.

## Husky Shelters API
Husky Shelters wants an API that allows people to update the dogs and cats info
and also the pictures.

## Image conversion
One of their concerns is that people update high resolution pictures that are too
heavy. This could make cloud operations more expensive. So they want that every
time someone updates a heavy image, the application resizes the image to a normal
resolution 500x500 and to a thumbnail resolution 50x50.

## Public website
They want to have a public website where the info is available for future owners of
these animals. The website will only display a list of animals with their thumbnail
image next to it. If a person clicks the animal, all pictures of the animal will display.
