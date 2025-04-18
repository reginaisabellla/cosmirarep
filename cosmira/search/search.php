<!DOCTYPE php>

<?php

//connecting to database
require("db_connect.php");

//retrieve data
$productQuery = "SELECT product_id, product_name, product_brand, product_category, product_image_url, product_description FROM cosmira_products";

//connection check
$productResults = $mysqli ->query($productQuery);
    if ($mysqli->error){
        print "collection failed" . $mysqli->error;
    }

?>


<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cosmira</title>
    <!-- need to link icons and css page -->
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="search.css" type="text/css" />
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
          <form action="search.js" method="post" name="searchBar">
            <input type="text" placeholder="S E A R C H" />
            <button type="submit" name="search" id="searchButton">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
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
    <!-- majority of content for this page will be added with databases, we just need the basics for now, maybe a sample -->
    <!-- <div class="title"><h2>Search Results...</h2></div> -->
    <br>
    <div class="container">
      <div class="stack">
        <h2>Trending Products</h2>
        <div class="trending">
          <ol>
            <li title="coming soon!">NARS Creamy Concealer</li>
            <li title="coming soon!">FENTY Pro Filt'r</li>
            <li title="coming soon!">Too Faced Born This Way</li>
            <li title="coming soon!">Benefit Liquid Lip Blush</li>
            <li title="coming soon!">Tarte Shape Tape</li>
            <li title="coming soon!">Dior Forever Skin</li>
            <li title="coming soon!">Maybelline Fit Me</li>
            <a href="../product/product.html"
              ><li>Makeup By Mario Surreal</li></a
            >
            <li title="coming soon!">MAC Studio Fix</li>
            <li title="coming soon!">Hourglass Airbrush</li>
          </ol>
        </div>
      </div>

      <div class="searchGrid">
          <div class="contentAlign">
            <div class="productAlign">
              <?php

                // empty array for database content
                $products = [];

                //store data in the array
                  while($productRow = $productResults->fetch_object()) {
                    $products[] = $productRow;
                }
                //grabbing product info from database
                foreach ($products as $product){
                          
                    print "\t\t<h1 class= 'brandName' >". $product->product_brand ."</h1>\n";
                    
                    print "\t\t <div class ='nameBack'><h3><a href= '../product/product.php'>". $product->product_name ."</a></h3></div>\n";
                    
                    print "\t\t<h4>". $product->product_category ."</h4>\n";
                    
                    print "\t\t<figure><img src='". $product->product_image_url ."' alt= '". $product->product_name ."'><figure>\n";
                    
                    print "\t\t<p>". $product->product_description ."</p>\n";

                    print "<br/>";
                }                    
            ?>
            </div> 
          </div>
               
          <!-- potential version for if database isnt working -->

       <!--  <div class="pageSearch" >
              <form action="search.js" method="post" name="pageSearch">
                <input type="text" placeholder="elf poreless putty primer" class="pageInput"/>
                <button type="submit" name="search" id="pageButton">
                  <i class="fa-solid fa-magnifying-glass"></i>
                </button>
              </form>
        </div>
        <div class="row1">
          <figure>
            <img src="../assests/img/icon1.svg" alt="icon of a shopping bag with a heart" class="searchPic">
            <figcaption>
              Products by brand
            </figcaption>
          </figure>
          <figure>
            <img src="../assests/img/icon2.png" alt="icon of powder makeup product" class="searchPic">
            <figcaption>
              Products by type
            </figcaption>
          </figure>
          <figure>
            <img src="../assests/img/icon3.svg" alt="icon of dollar bills" class="searchPic">
            <figcaption>
              Products by price
            </figcaption>
          </figure>
        </div>
        <div class="row2">
          <figure>
            <img src="../assests/img/icon4.png" alt="icon of a person speaking" class="searchPic">
            <figcaption>
              Discussions
            </figcaption>
          </figure>
          <figure>
            <img src="../assests/img/icon5.png" alt="icon of notepad and pencil" class="searchPic">
            <figcaption>
              Reviews
            </figcaption>
          </figure>
          <figure>
            <img src="../assests/img/icon6.png" alt="icon of a lady and makeup brush" class="searchPic">
            <figcaption>
              Tutorials
            </figcaption>
          </figure>
        </div> -->
      </div>
    </div>
  </body>
</html>