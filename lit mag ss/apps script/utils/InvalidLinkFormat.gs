/*
light_red_3:"#f4cccc",
light_orange_3:"#fce5cd",
light_yellow_3:"#fff2cc",
light_green_3:"#d9ead3",
light_blue_3:"#cfe2f3"
*/

genres = ['MASTER LIST', 'Short Story Fiction','Poetry','Personal Essay','Other Prose',
  'Photography','Drawing','Painting','Mixed Media','Other'];
checkboxLetter = 'L';

function triggerInvalidLink(e) {
  if (!e) {
    throw new Error('Please do not run the script in the script editor window. It runs automatically when you edit the spreadsheet.');
  }
  // check if correct sheet, correct cell
  else if (genres.includes(e.source.getActiveSheet().getName()) && e.range.getA1Notation().startsWith(checkboxLetter)){
      toggleInvalidLink(e.range, e.source.getActiveSheet());
  }
}

function toggleInvalidLink(rn, sh) {
  n = rn.getA1Notation().slice(1);
  // K, LMNOPQRS, UVWXYZ
  ls = ['K'+n+':L'+n,'M'+n,'N'+n,'O'+n,'P'+n,'Q'+n,'R'+n+':S'+n, 'U'+n+':Z'+n];
  rns = sh.getRangeList(ls).getRanges();

  // toggle 
  // if true, then red
  if (rn.getValue() === true){
    rns.forEach(r => r.setBackground('red'));
  }
  // else, if false, then reset to normal colors
  else{
    rns[0].setBackground('black');
    rns[1].setBackground('#f4cccc');
    rns[2].setBackground('#fce5cd');
    rns[3].setBackground('#fff2cc');
    rns[4].setBackground('#d9ead3');
    rns[5].setBackground('#cfe2f3');
    rns[6].setBackground('white');
    rns[7].setBackground('black');
  }
}
