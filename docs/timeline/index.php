<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Spygate Timeline</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" />
  <link rel="stylesheet" href="../default.css">
  <link rel="stylesheet" href="timeline.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script>
		$(document).ready(function(){
			$("#myInput").on("keyup", function() {
				var value = $(this).val().toLowerCase();
				$("#tbody tr").filter(function() {
					$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
				});
			});
		});
	</script>
</head>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-127878804-1');
</script>

<body>

  <header>
	<div id="logo_image"><a href="../"><img src="../spygate_search_logo.png"/></a></div>
	<div class="navbar">
		<a href="../about">ABOUT</a>
		<a href="../resources">RESOURCES</a>
		<div class="dropdown">
			<button class="dropbtn">INTERACTIVES<i class="fa fa-caret-down"></i>
			</button>
			<div class="dropdown-content">
				<a href="../">SEARCH ORIGINAL TEXTS</a>
				<a href="../timeline_live">SEARCH RAW TIMELINE</a>
				<a href="../map">EXPLORE MAP</a>
			</div>
		</div>
  </header>
  
	<main>
		
		<div id="topbar">
			<div id="searchbar">
				<input type="text" id="myInput" placeholder="Filter by a term...">
				<!--<input type="text" id="myInput" onkeyup="myFunction()" placeholder="Filter by a term...">-->
			</div>
			<div id="toptext">
				<i>This table mirrors the <a href="https://github.com/codyave/WhiteHat/blob/master/Timeline_of_Events.txt">Timeline_of_Events.txt</a> github file at @codyave's WhiteHat repository. You can fork via github, contribute, and see your work show up here!</i>
			</div>
		</div>
		<div id="maintablediv">
		<table id="myTable">
			<thead>
				<tr class="header">
					<th class="col1">Date</th>
					<th class="col2"><div id="event"><div id="eventleft">Event</div><div id="eventright">
							<?php
								echo "Last table update (PST): ".date("F d Y H:i:s",filemtime("Timeline_of_Events.txt")-28800);
								$linecount = 0;
								$handle = fopen("Timeline_of_Events.txt", "r");
								while(!feof($handle)){
									$line = fgets($handle);
									$linecount++;
								}
								fclose($handle);
								echo ",  $linecount lines total";
							?></div></div>
					</th>
				</tr>
			</thead>
			<tbody id="tbody">
		<?php
		$myfile = fopen("Timeline_of_Events.txt", "r") or die("Unable to open file!");

		// The Regular Expression filter
		$reg_exUrl1 = 'archive.';
		$reg_exUrl2 = 'bit.';
		//$newsorgs = 'NYT';
		//$Flynntag = 'Flynn';
		//$Ukrainetag = 'Ukraine';

		// Output one line until end-of-file
		while(!feof($myfile)) {
			//get line
			$myline = fgets($myfile);
			
			// Check if there is a url in the text
			//$myline = preg_replace("/\w*?$newsorgs\w*/i", "<span style="background-color:red">$0</span>", $myline);
			//$myline = preg_replace("/\w*?$Flynntag\w*/i", "$0 ⭐⭐⭐", $myline);
			//$myline = preg_replace("/\w*?$Ukrainetag\w*/i", "$0 🇺🇦", $myline);
			$myline = preg_replace("/\w?$reg_exUrl1\S*/i", "<a href='http://www.$0'>$0</a>", $myline);
			$myline = preg_replace("/\w?$reg_exUrl2\S*/i", "<a href='http://www.$0'>$0</a>", $myline);
			
			// format as table
			if ($myline == "\n"){
			}
			else {
				echo '<tr><td>';
				echo substr($myline, 2, 13);
				echo '</td><td>';
				echo substr($myline, 17, -1);
				echo '</td></tr>';
			}
		}
		fclose($myfile);
		?>
			</tbody>
		</table>
		</div>
	</main>

  <footer>
    Source Code on <a href="https://github.com/nickweil/russiagate">Github</a> -
    Contact spygatetexts@protonmail.com for more information
  </footer>

</body>

<!-- /SCRIPTS -->
<!--<script src="timeline.js"></script>-->
<!-- /SCRIPTS -->

</html>
