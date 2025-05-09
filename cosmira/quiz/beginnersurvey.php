<!DOCTYPE php>

<?php
//connecting to database
session_start();
require("db_connect.php");

//later will add login function

//allowing user selections to enter database
 if(isset($_POST["submit"])){
    $matchQuery = "INSERT INTO cosmira_match_beginner(match_beginner_user_id, match_skin_tone, match_skin_type, match_skin_concern, match_skin_undertone, match_coverage, match_finish) VALUE (NULL, '".$_POST["skin-colortest"]."', '".$_POST["skin-type"]."', '".$_POST["skin-issue"]."', '".$_POST["undertone"]."', '".$_POST["coverage"]."', '".$_POST["finish"]."' )";

    //error checking
    $matchQuery = $mysqli->query($matchQuery);
        if($mysqli->error){
            print "connection error :(". $mysqli->error ;
        }
 }

?>

<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Quiz-BeginnerSurvey</title>
    <link rel="stylesheet" href="../quiz/quiz.css" />
  </head>
<body>
  <header>
    <div class="heading">
      <div class="logo">
        <a href="https://reginaisabellla.github.io/cosmirarep/">
        <img src="../assests/img/cos-removebg.png" alt="Cosmira Logo" />
        </a>
      </div>
      <div class="search">
        <input type="search" placeholder="S E A R C H" />
      </div>
    </div>
    <nav>
      <ul class="nav-links">
        <li>
          <a class="nav-link" href="../about/about.html">ABOUT</a>
        </li>
        <li><a class="nav-link" href="../quiz/quiz.html">QUIZ</a></li>
        <li>
          <a class="nav-link" href="../discover/discover.html">DISCOVER</a>
        </li>
        <li>
          <a class="nav-link" href="../community/community.html">COMMUNITY</a>
        </li>
        <li>
          <a class="nav-link" href="../profile/profile.html">PROFILE</a>
        </li>
      </ul>
    </nav>
  </header>
  <div class="container">
    <div class="pop-up">
        <h1>BEGINNER QUIZ</h1>
      <form id="quiz-form">
        <div class="bq-question">
          <h2>Question 1.</h2>
          <div class="quiz-text">
            <p>Select the skin color range MOST accurate to yours:</p>
          </div>
          <div class="color-buttons">
            <label class="skin-color">
              <input type="radio" class="skin-color" name="skin-colortest" value="1"/>
              <span class="color-box" id="color1">
                <div class="textcolor"> 1 </div>
              </span>
            </label>
            <label class="skin-color">
              <input type="radio" class="skin-color" name="skin-colortest" value="6"/>
              <span class="color-box" id="color6">
                <div class="textcolor"> 6 </div>
              </span>
            </label>
            <label class="skin-color">
              <input type="radio" class="skin-color" name="skin-colortest" value="2"/>
              <span class="color-box" id="color2">
                <div class="textcolor"> 2 </div>
              </span>
            </label>
            <label class="skin-color">
              <input type="radio" class="skin-color" name="skin-colortest" value="7"/>
              <span class="color-box" id="color7">
                <div class="textcolor"> 7 </div>
              </span>
            </label>
            <label class="skin-color">
              <input type="radio" class="skin-color" name="skin-colortest" value="3"/>
              <span class="color-box" id="color3">
                <div class="textcolor"> 3 </div>
              </span>
            </label>
            <label class="skin-color">
              <input type="radio" class="skin-color" name="skin-colortest" value="8"/>
              <span class="color-box" id="color8">
                <div class="textcolor"> 8 </div>
              </span>
            </label>
            <label class="skin-color">
              <input type="radio" class="skin-color" name="skin-colortest" value="4"/>
              <span class="color-box" id="color4">
                <div class="textcolor"> 4 </div>
              </span>
            </label>
            <label class="skin-color">
              <input type="radio" class="skin-color" name="skin-colortest" value="9"/>
              <span class="color-box" id="color9">
                <div class="textcolor"> 9 </div>
              </span>
            </label>
            <label class="skin-color">
              <input type="radio" class="skin-color" name="skin-colortest" value="5"/>
              <span class="color-box" id="color5">
                <div class="textcolor"> 5 </div>
              </span>
            </label>
            <label class="skin-color">
              <input type="radio" class="skin-color" name="skin-colortest" value="10"/>
              <span class="color-box" id="color10">
                <div class="textcolor"> 10 </div>
              </span>
            </label>
          </div>
        </div>
        <div class="bq-question">
          <h2>Question 2.</h2>
          <div class="quiz-text">
            <p>What is your skin type?</p>
          </div>
          <div class="skin-type">
          <label>
            <input type="radio" name="skin-type" value="Normal" required/>Normal 
          </label><br>
          <label>
            <input type="radio" name="skin-type" value="dry" required/>Dry 
          </label><br>
          <label>
            <input type="radio" name="skin-type" value="oily" required/>Oily 
          </label><br>
          <label>
            <input type="radio" name="skin-type" value="combination" required/>Combination <br>
          </label>
          </div>
        </div>  
        <div class="bq-question">
          <h2>Question 3.</h2>
          <div class="quiz-text">
            <p>Do you have any skin concerns?</p>
          </div>
          <div class="skin-issue">
            <!---add js to make sure checkbox input required-->
            <label>
              <input type="checkbox" name="skin-issue" value="acne" />Acne
            </label><br>
            <label>
              <input type="checkbox" name="skin-issue" value="hyperpig" />Hyperpigmentation
            </label><br>
            <label>
              <input type="checkbox" name="skin-issue" value="finelines" />Fine-Lines or Wrinkles
            </label><br>
            <label>
              <input type="checkbox" name="skin-issue" value="Sensitive" />Sensitive Skin
            </label><br>
          </div>
        </div>
        <div class="bq-question">
          <h2>Question 4.</h2>
          <div class="quiz-text">
            <p>Have you previously used makeup with a specific undertone, which do you frequently wear?</p>
          </div>
          <div class="undertone">
            <!---add color range/wheel image that falls under each undertone-->
            <label>
              <input type="radio" name="undertone" value="cool" />Cool
            </label><br>
            <label>
              <input type="radio" name="undertone" value="warm" />Warm 
            </label><br>
            <label>
              <input type="radio" name="undertone" value="neutral"/>Neutral
            </label><br>
            </div>
        </div> 
        <div class="bq-question">
          <h2>Question 5.</h2>
          <div class="quiz-text">
            <p>What type of coverage do you prefer?</p>
          </div>
          <div class="coverage">
            <label>
              <input type="checkbox" name="skin-issue" value="sheer" />Sheer
            </label><br>
            <label>
              <input type="checkbox" name="skin-issue" value="medium" />Medium
            </label><br>
            <label>
              <input type="checkbox" name="skin-issue" value="full" />Full
            </label><br>
          </div>
       
        </div> 
        <div class="bq-question">
          <h2>Question 6.</h2>
          <div class="quiz-text">
            <p>What foundation finish are you looking for?</p>
          </div>
          <div class="finish">
            <label>
              <input type="radio" name="finish" value="sheer" required/>Matte
            </label><br>
            <label>
              <input type="radio" name="finish" value="medium" required/>Dewy
            </label><br>
            <label>
              <input type="radio" name="finish" value="full" required/>Natural
            </label><br>
          </div>
        </div> 
        <div class="button-single">
          <input class="matchbutton" name="submit" type="submit" value="Get My Match!" id="submit">
        </div>
      </form>
    </div>
  </div>
  <!-- <script src="../quiz/quiz.js"></script> -->
</body>
</html>

<!-- closing mysqli -->

<?php
    $mysqli->close();
?>