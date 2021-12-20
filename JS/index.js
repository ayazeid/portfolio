//Global variables

//jQuery code
$(document).ready(function () {
  //onload active home page
  $("a:contains('Home')").addClass("active");
  $(".page-link:contains('Skills')").addClass("active");
  $("#certificates").hide(``);
  $("#education").hide();

  //onclick active section and remove others
  $("a").on("click", function (e) {
    $("a").removeClass("active");
    $(e.target).addClass("active");
  });

  //about section
  $(".page-link").on("click", function () {
    event.preventDefault();
    if (event.target.href.includes("index.html#certificates")) {
      $("#skills").hide(``);
      $("#education").hide();
      $("#certificates").show(``);
    } else if (event.target.href.includes("index.html#skills")) {
      $("#skills").show(``);
      $("#certificates").hide(``);
      $("#education").hide();
      $("#skills").show(``);
    } else if (event.target.href.includes("index.html#education")) {
      $("#skills").hide(``);
      $("#certificates").hide(``);
      $("#education").show();
    }
  });

  //fetch certificates
  fetch("../json/myCertificates.json")
    .then((response) => response.json())
    .then((certs) => {
      for (i in certs) {
        const certCard = document.createElement("div");
        certCard.innerHTML = `<div class="card bgDark">
      <div class="card-header" id="heading${certs[i].id}">
        <h5 class="mb-0">
          <button
            class="btn btn-link collapsed"
            data-toggle="collapse"
            data-target="#collapse${certs[i].id}"
            aria-expanded="true"
            aria-controls="collapse${certs[i].id}"
          >
          ${certs[i].name}
          </button>
        </h5>
      </div>

      <div
        id="collapse${certs[i].id}"
        class="collapse"
        aria-labelledby="heading${certs[i].id}"
        data-parent="#accordion"
      >
        <div class="card-body">
          <div class="card bg-dark text-white">
            <img src=${certs[i].image} class="card-img" alt="...">
            <div class="card-img-overlay">
              <a class="card-title  bgAccent txtDark rounded h6 p-1 float-right" href=${certs[i].url} target="_blank">View</a>
              
            </div>
          </div>
        </div>
      </div>
    </div>`;

        $("#accordion").append(certCard);
      }
    });

  fetch("../json/mywork.json")
    .then((response) => response.json())
    .then((works) => {
      works.map((work) => {
        //create work card for projects
        const workCard = document.createElement("div");
        workCard.innerHTML = `<div  class="col mb-4 projectCard">
        <div id='project${work.id}' class="card bg-transparent project">
          <div id='btn${work.id}' class="card-img-overlay bgDark pt-1 btn-hide ">
    <span data-toggle="modal" data-target="#exampleModalLong" class="btn btn-warning modalView" key='${work.id}' id='proj${work.id}'>View</span>
          </div>
          <img src=${work.imagesURL[0]} class="card-img-top " alt="..." />
          
          <div class="card-Footer bgDark txtWhite portFooter text-left pl-1">
            <p class="card-text m-1 ">${work.title}</p> 
          </div>
        </div>
      </div>`;

        //create modal with carousel view of project screens
        //modal
        const modal = document.createElement("div");
        modal.innerHTML = `<!-- Modal -->
      <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
              <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
              <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
              
            </div>
            <button class="carousel-control-prev" type="button" data-target="#carouselExampleCaptions" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-target="#carouselExampleCaptions" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </button>
          </div>
            </div>
            <div class="modal-footer justify-content-start">
              
            </div>
          </div>
        </div>
      </div>`;

        $(workCard).append(modal);
        $(".myworks").append(workCard);
      });

      $(".btn-hide").hide();
      $(".project").on("mouseover", function () {
        $(this).children(".btn-hide").show();
      });
      $(".project").on("mouseout", function () {
        $(this).children(".btn-hide").hide();
      });

      //modal view eventhandling
      $(".modalView").on("click", function () {
        const id = $(this).attr("key") - 1;
        fetch("../json/mywork.json")
          .then((response) => response.json())
          .then((projs) => {
            const work = projs[id];
            work.imagesURL.map((url) => {
              //carusel items
              const carosuelItem = document.createElement("div");

              carosuelItem.classList.add("carousel-item");
              carosuelItem.innerHTML = `<img src=${url} class="d-block w-100" alt="...">`;

              $(".carousel-inner").append(carosuelItem);
            });
            work.tools.map((tool) => {
              const icon = document.createElement("span");
              icon.innerHTML = `<img  src=${tool} width="35" />`;

              $(".modal-footer").append(icon);
            });
            $(".modal-footer").append(
              `<span class='txtDark'>${work.part}</span>`
            );
            $(".carousel-inner div:first-child").addClass("active");
          });
      });
      $(".close").on("click", function () {
        $(".carousel-inner").html(" ");
        $(".modal-footer").html(" ");
      });
    });

  //scroll to top button
  const button = document.createElement("button");
  button.textContent = "Top";
  button.classList = "btn topUpBtn btn-warning float-right";
  $("footer .fixed-bottom span:first-child").append(button);

  $(button).on("click", function () {
    window.scrollTo(0, 0);
    $(".nav-link").removeClass("active");
    $(".nav-link:contains('Home')").addClass("active");
  });
});
