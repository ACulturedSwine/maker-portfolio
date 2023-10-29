# (Haphazard) Development Log for Literary magazine 🙃
## TODO (general process)
- [ ] Ask Schneider/Lit Mag members about
  - [ ] What features to add
  - [ ] How to revise features
    - [ ] Conditional formatting for status > # ratings (what should be red, yellow, green, etc. // coloring scale?)
- [ ] Research cool things to do with Gform/Gsheets (script editor, etc.)
  - [ ] Onchange event / other triggers
  - [ ] https://docs.google.com/spreadsheets/d/1XlAbMfEhjQ1EFkGU0DH8nDFD9QV_Je48-Oz7JHuJyrI/edit?usp=sharing 
  - [ ] Animation w/ google sheets
- [ ] Mechanics
  - [ ] add access to gform file folder for everyone
  - [ ] Protection - big boi protection
    - [ ] Protect scripts, formulas, etc. (granted, i could have a separate spreadsheet with all of that stuff so won’t have to protect a lot of things)
    - [ ] Protect any query columns!
  - [ ] Hide ‘script’ sheets
## TODO (relating to the program)
Major
- [ ] Protection unable to access? -> need to direct to official NVHS Essence email
- [ ] Copy and pasting formula/data validation rule - make algorithm for this for when sheet is being used (i.e. non-formula and data validation rules are in cells) and need changing of formula
  - [ ] For now, everything is blank so can just copy and paste entire rows
  - [ ] STUFF THAT I CHANGED:
    * HIDE G TO J
    * Piece link
    * Shortened L column to smallest (although i can do this manually)
    * Shortened S column (# ratings)
    * Link to piece column (link gid needs to change based on sheet it’s in)
Medium
- [ ] Validate url - doesn’t really work in gform since copy and pasting url from Share tab, regardless of permissions, still has /edituspsharingorwhatever (although deters the ppl who copy and paste from the search bar at least)
- [ ] Link stuff
  - [ ] Sometimes url accidentally turns into link for both friendly text and actual url - idk why
    - [ ] Maybe try an alternate method - like entering the raw url somewhere, then hiding that column and turning a new column into shortened url (i think this method is much better)
    - [ ] Alt method worked, although link is still not shortened on master list
  - [ ] Need to remove smart chips from email (since value queried would be their name, not the actual email)

Minor
- [ ] Make formatting more lenient (allow for basically any number in front + whatever??? - since it seems like average column doesn’t care)
- [ ] Average only takes first number - doesn’t take 2/3, 2.5 etc. (maybe put format)

## RESOURCES
* MY STUFF: actual (ss, scripts) vs. test (ss, scripts)
* 2018-2019, 2020-2021, 2021-2022 spreadsheets
* https://www.benlcollins.com/spreadsheets/google-sheets-regex-formulas/ 

## IDEAS
### STYLISTIC IDEAS
* Spice up the form
  * Make it look cool
  * Add option for media type if art (paint, gouache, etc.)
  * Programming idea: organize file submissions by author/type/etc. (i don’t think this is necessary tho, since access of piece happens in spreadsheet anyways)
  * HEIC warning?
* Google doc for artist statements?????
* Format genre tabs text alignment TOP, text WRAP

### PROGRAMMING IDEAS
* Filter by rating/number of ratings (+ mail button)
* Status update tab
  * Top rated (by rating) + which ones need rating (first tab on spreadsheet)
  * https://www.maketecheasier.com/change-cell-color-google-sheet/ 
* Rating automatic averager
* Markers: unable to access doc, submitted after deadline, repeated submission, (CW kids)
  * Repeated submission - send warning, add 
  * Unable to access doc - possible methods:
    * Checkbox for when this happens (or program that checks if true)
    * Button that creates email list (cc) of ppl to send the email to
      * https://developers.google.com/chart/interactive/docs/querylanguage 
      * https://docs.google.com/spreadsheets/d/15MyKzyh81WZiCIF66ipu77JgqFj2qxamLrkbVk1MAWM/edit#gid=0 
  * Automatically add file to Lit Mag GDrive for pieces so everyone can view
  * Gform automatically checks if can access doc or not (if not, prompts user to do it again) done via regex
* Convert HEIC files to JPG automatically (or mark it for conversion?)
* Solving error thing (maybe automatically clean up? prevent user from being able to edit in cell in first place? - i like second idea better)
* Toolbar/menu/sidebar to navigate between subjects easier

### MISC IDEAS TO IMPLEMENT LATER
Making the layout
* ??? How to create (idk yet)
  * Checkboxes by pieces
* Link to its rating row whenever title is mentioned
* Automatically generated table of contents (customize ordering/formatting - key words: TITLE, AUTHOR)
* Automatically show author name/type of piece/email (if art) - if hover??? maybe creates list so can copy and paste??
* Emailing option for ppl whose pieces are in layout
  * Automatically create email list
  * Or maybe have email button next to piece?
  * (Especially useful for artist statements)
* Making Indesign layout
* Maybe an Indesign add-on for later?

## CODING SNIPPETS

=QUERY({'Short Story Fiction'!B2:L;'Poetry'!B2:L;'Personal Essay'!B2:L;'Other Prose'!B2:L;'Photography'!B2:L;'Drawing'!B2:L;'Painting'!B2:L;'Mixed Media'!B2:L;'Other'!B2:L},"select Col1, Col6, Col7 where Col11 = true and Col6 IS NOT NULL")

(unused)

={"Average";Arrayformula(IF(NOT(EQ(COUNTA(M2:Q2), 0)),((IF(NOT(ISBLANK(M2)), REGEXEXTRACT(M2, "^[1-5]")) + IF(NOT(ISBLANK(N2)), REGEXEXTRACT(N2, "^[1-5]")) + IF(NOT(ISBLANK(O2)), REGEXEXTRACT(O2, "^[1-5]")) + IF(NOT(ISBLANK(P2)), REGEXEXTRACT(P2, "^[1-5]")) + IF(NOT(ISBLANK(Q2)), REGEXEXTRACT(Q2, "^[1-5]"))) / COUNTA(M2:Q2)), "No ratings!"))}
={"# ratings";Arrayformula(S2:S)}
={"# ratings";Arrayformula(COUNTA((M2:M):(Q2:Q)))}
