 let fetchedResults = null;
 const marquee = document.getElementById('videoTitleMarquee');

  function fetchVideoInfo() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const videoUrl = tabs[0].url;

      marquee.textContent = "Fetching video information...";

      const apiUrl = `https://youtube-video-and-shorts-downloader1.p.rapidapi.com/api/getYTVideo?url=${videoUrl}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'ce670b6670msha0f6220fdbfcba7p1d6888jsnfd64eb1e8c81',
          'X-RapidAPI-Host': 'youtube-video-and-shorts-downloader1.p.rapidapi.com'
        }
      };

      fetch(apiUrl, options)
        .then(response => response.json())
        .then(result => {
          
            marquee.textContent = result.title || "Video Title Not Available";;
            
            fetchedResults = result;
        })
        .catch(error => {
          console.log(error);
  
          marquee.textContent = "Error fetching video information.";
        });
    });
  }

  fetchVideoInfo();

  function initiateDownload() {
    if (fetchedResults && fetchedResults.links && fetchedResults.links.length > 0) {
      if (fetchedResults.links[0].quality === "hd_720p") {
        const downloadLink = fetchedResults.links[0].link;
        window.open(downloadLink, '_blank');

      } else if (fetchedResults.links[1].quality === "hd_720p") {
        const downloadLink = fetchedResults.links[1].link;
        window.open(downloadLink, '_blank');
      }
    } else {
      marquee.textContent = 'No download link found.';
    }
  }

  document.getElementById('downloadButton').addEventListener('click', initiateDownload);