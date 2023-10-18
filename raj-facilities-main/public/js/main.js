(function ($) {
  ("use strict");

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 45) {
      $(".navbar").addClass("sticky-top shadow-sm");
    } else {
      $(".navbar").removeClass("sticky-top shadow-sm");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Skills
  $(".skill").waypoint(
    function () {
      $(".progress .progress-bar").each(function () {
        $(this).css("width", $(this).attr("aria-valuenow") + "%");
      });
    },
    { offset: "80%" }
  );

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000,
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    margin: 25,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      992: {
        items: 2,
      },
    },
  });

  // Portfolio isotope and filter
  var portfolioIsotope = $(".portfolio-container").isotope({
    itemSelector: ".portfolio-item",
    layoutMode: "fitRows",
  });
  $("#portfolio-flters li").on("click", function () {
    $("#portfolio-flters li").removeClass("active");
    $(this).addClass("active");

    portfolioIsotope.isotope({ filter: $(this).data("filter") });
  });

  function showMessage(msg, success) {
    if (!msg) {
      msg = "Invalid Input!";
    }
    // Show alert
    let alert = document.querySelector(".alert");
    if (!alert.style.display || alert.style.display == "none") {
      if (success) {
        alert.classList.add("success");
      } else {
        alert.classList.add("error");
      }
      alert.innerHTML = msg;
      alert.style.display = "block";

      // Hide alert after 3 seconds
      setTimeout(() => {
        alert.style.display = "none";
        if (success) {
          alert.classList.remove("success");
        } else {
          alert.classList.remove("error");
        }
      }, 3000);
    }
  }

  function hideMessage() {
    // hide alert
    let alert = document.querySelector(".alert");
    alert.style.display = "none";
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validateMobile = (mobile) => {
    return /^[6-9]\d{9}$/.test(mobile);
  };

  let submittedMobile = localStorage.getItem("submittedMobile");
  let submittedEmail = localStorage.getItem("submittedEmail");
  if (!submittedMobile) submittedMobile = "";
  if (!submittedEmail) submittedEmail = "";

  function checkLocal(str) {
    if (submittedMobile.includes(str) || submittedEmail.includes(str)) {
      return true;
    }
    return false;
  }

  // contact form
  //Unique Firebase Object
  var firebaseConfig = {
    apiKey: "AIzaSyAp02oKx38CI5Xq6x6WzrjNvdchfkr1-Zg",
    authDomain: "rajfacilities-services.firebaseapp.com",
    projectId: "rajfacilities-services",
    storageBucket: "rajfacilities-services.appspot.com",
    messagingSenderId: "767095786365",
    appId: "1:767095786365:web:f571b537baa505ff0b5a14",
    measurementId: "G-8N1QMF1D36",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  console.log("firebase initialised", firebase);
  // Initialize Firestore and get a reference to the service
  var firestore = firebase.firestore();

  // Initialize Analytics and get a reference to the service
  const analytics = firebase.analytics();

  //Variable to access database collection
  const db = firestore.collection("contact-form");
  console.log("contact-form db", db);

  console.log("$.ajax", $.ajax);

  //Get Submit Form
  let submitButton = document.getElementById("submit");
  let contactForm = document.getElementById("contactForm");

  // deploy script
  // https://script.google.com/macros/s/AKfycbxIuZ1lrA3eavy1c9PuTFVe5xAFri_kD70SXLZRUm1RDEuabzilxSvUscupqzA_YRVdjQ/exec

  //Create Event Listener To Allow Form Submission
	window.loading = false;

  window.validateForm = function () {
		console.log("validateMyForm called");

    let nameRef = document.getElementById("name");
    let emailRef = document.getElementById("email");
    let mobileRef = document.getElementById("mobile");
    let messageRef = document.getElementById("message");

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let mobile = document.getElementById("mobile").value;
    let message = document.getElementById("message").value;

    if (name) {
      if (name.length >= 3 && name.length < 30) {
        // pass
      } else {
        showMessage("Please enter valid name!");
        nameRef.value = "";
        return false;
      }
    } else {
      showMessage("Name is required!");
      return false;
    }

    if (mobile) {
      if (mobile.toString().includes("+")) {
        showMessage("Please enter 10 digit mobile number!");
        mobileRef.value = null;
        return false;
      } else {
        if (validateMobile(mobile)) {
          // pass
        } else {
          showMessage("Please enter 10 digit mobile number!");
          mobileRef.value = null;
          return false;
        }
      }
    } else {
      showMessage("Mobile number is required!");
      return false;
    }

    if (email) {
      if (validateEmail(email)) {
        // pass
      } else {
        showMessage("Please enter valid email Id!");
        emailRef.value = "";
        return false;
      }
    } else {
      showMessage("Email Id is requried!");
      return false;
    }

    // all values there
    console.log("all inputs are valid...");
    if (!checkLocal(mobile) && !checkLocal(email)) {
			console.log("new data..");
      // store data
			
			if(!window.loading){
				window.loading = true;
				submitButton.disabled = true;
				submitButton.innerHTML = 'Loading...';
				/* https://github.com/levinunnink/html-form-to-google-sheet */
				// ajax method
				var fd = new FormData();
				fd.append("Name", name);
				fd.append("Mobile", email);
				fd.append("Email", mobile);
				fd.append("Message", message);
	
				$.ajax({
					url: "https://script.google.com/macros/s/AKfycbxIuZ1lrA3eavy1c9PuTFVe5xAFri_kD70SXLZRUm1RDEuabzilxSvUscupqzA_YRVdjQ/exec",
					data: fd,
					processData: false,
					contentType: false,
					type: "POST",
					success: function (resp) {
						console.log("details added!", resp);
	
						submittedMobile += ", " + mobile;
						submittedEmail += ", " + email;
	
						localStorage.setItem("submittedMobile", submittedMobile);
						localStorage.setItem("submittedEmail", submittedEmail);
	
						// show success
						showMessage("We will get in touch soon!", true);
	
						// reset form
						contactForm.reset();

						window.loading = false;
						submitButton.disabled = false;
            submitButton.innerHTML = "Request a callback";
					},
					error: function (data) {
						console.error("Form submit error", err);
						showMessage("Please try again!");
						window.loading = false;
						submitButton.disabled = false;
            submitButton.innerHTML = "Request a callback";
					},
				});
	
				// firestore method
				// db.add({
				//   name: name,
				//   email: email,
				//   mobile: mobile,
				// 	submittedAt: new Date(),
				//   message: message ?? "No Message!",
				// })
				//   .then((resp) => {
				//     console.log("details added!", resp);
	
				//     submittedMobile += ", " + mobile;
				//     submittedEmail += ", " + email;
	
				//     localStorage.setItem("submittedMobile", submittedMobile);
				//     localStorage.setItem("submittedEmail", submittedEmail);
	
				//     // show success
				//     showMessage("We will get in touch soon!", true);
	
				//     // reset form
				//     // contactForm.reset();
				//   })
				//   .catch((err) => {
				//     console.error("Form submit error", err);
				//     showMessage("Please try again!");
				//   });

			}else{
				console.log('loading data...');
			}

    } else {
      console.log("existing data..");
      // show error
      showMessage("Details already submitted!", false);
    }
  };
})(jQuery);
