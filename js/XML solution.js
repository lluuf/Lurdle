function openFile(num) {
    var client = new XMLHttpRequest();
    client.open('GET', '/word-list/words2/words_' + num + '.txt');
    client.onreadystatechange = function() {
      // do something with client.responseText
      console.log(client.responseText)
    }
    client.send();
  }