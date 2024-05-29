document.addEventListener("DOMContentLoaded", function () {
    const jsonData = {
      header: {
        logo: {
          src: "/image/Logo.png",
          alt: "Company Logo",
        },
        menu: [
          {
            text: "Shop",
            url: "/shop",
          },
          {
            text: "Brands",
            url: "/brands",
          },
          {
            text: "Contact Us",
            url: "/contact us",
          },
        ],
        button: {
          text: "Sign Up",
          url: "/signup",
        },
      },
      homepage: {
        slider: [
          {
            heading: "Exquisite Watches",
            subheading: "Gold Luxury, ",
            span: "Choose Us",
            description:
              "Discover the Perfect Watch for Every Occasion and Elevate Your Style with Timeless Elegance and Precision Craftsmanship - watch",
            price: "$499.00",
            image: {
              src: "/image/Group 4.png",
              alt: "Featured Product 1",
            },
            backgroundColor: "#fac89c",
          },
          {
            heading: "Dainty Timepieces",
            subheading: "Silver Luxury, ",
            span: "Choose Us",
            description:
              "Explore the Ideal Timepiece for Any Moment and Enhance Your Style with Timeless Sophistication and Impeccable Craftsmanship - timepiece",
            price: "$469.00",
            image: {
              src: "/image/Group 5.png",
              alt: "Featured Product 2",
            },
            backgroundColor: "#cdcece",
          },
          {
            heading: "Elegant Timepieces",
            subheading: "Choose Luxury, ",
            span: "Choose Us",
            description:
              "Discover the Perfect Watch for Every Occasion and Elevate Your Style with Timeless Elegance and Precision Craftsmanship - watch",
            price: "$529.00",
            image: {
              src: "/image/Group 6.png",
              alt: "Featured Product 3",
            },
            backgroundColor: "#59c97e",
          },
          {
            heading: "Refined Timepieces",
            subheading: "Choose Luxury, ",
            span: "Choose Us",
            description:
              "Explore the Ideal Timepiece for Any Moment and Enhance Your Style with Timeless Sophistication and Impeccable Craftsmanship - timepiece",
            price: "$469.00",
            image: {
              src: "/image/Group 7.png",
              alt: "Featured Product 4",
            },
            backgroundColor: "#fa8479",
          },
        ],
        socialMediaIcons: [
          {
            platform: "Facebook",
            url: "https://www.facebook.com/YourPage",
            icon: "/image/vector (2).png",
          },
          {
            platform: "Twitter",
            url: "https://www.twitter.com/YourProfile",
            icon: "/image/vector (3).png",
          },
          {
            platform: "Instagram",
            url: "https://www.instagram.com/YourProfile",
            icon: "/image/Exclude.png",
          },
        ],
      },
    };

    // Set header content
    const logoImg = document.querySelector(".header__logo img");
    logoImg.src = jsonData.header.logo.src;
    logoImg.alt = jsonData.header.logo.alt;

    const menu = document.getElementById("header__menu");
    jsonData.header.menu.forEach((item) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = item.url;
      a.textContent = item.text;
      li.appendChild(a);
      menu.appendChild(li);
    });

    const button = document.querySelector(".button");
    button.href = jsonData.header.button.url;
    button.textContent = jsonData.header.button.text;

    // Set slider content
    const splideList = document.getElementById("splide-list");
    jsonData.homepage.slider.forEach((item) => {
      const slide = document.createElement("li");
      slide.classList.add("splide__slide");
      slide.style.backgroundColor = item.backgroundColor; // Set background color
      slide.innerHTML = `
          <div class="content">
            <h2>${item.heading}</h2>
            <h3>${item.subheading}<span>${item.span}</span></h3>
            <p>${item.description}</p>
            <div class="price">${item.price}</div>
            <div class="social__icons">
              ${jsonData.homepage.socialMediaIcons
                .map(
                  (iconData) => `
                <a href="${iconData.url}" target="_blank">
                  <img src="${iconData.icon}" alt="${iconData.platform} icon">
                </a>
              `
                )
                .join("")}
            </div>
          </div>
          <div class="image">
            <img src="${item.image.src}" alt="${item.image.alt}">
          </div>
        `;
      splideList.appendChild(slide);
    });

    // Initialize Splide slider
    const slider = new Splide("#dynamic__slider", {
      type  : 'fade',
      perPage: 1,
      perMove: 1,
      pagination: false,
      arrows: true,
      breakpoints: {
        600: {
          arrows: true,
        },
      },
    }).mount();

    // Change navbar background color and homepage content based on active slide's background color
    slider.on("moved", function () {
      const activeSlideIndex = slider.index;
      const activeSlide = jsonData.homepage.slider[activeSlideIndex];
      const navbar = document.querySelector("header");
      const homepage = document.querySelector(".homepage__content");

      // Apply background color change without transition
      navbar.style.transition = "none";
      homepage.style.transition = "none";

      // Apply background color change with a delay to trigger the transition effect after a short delay
      setTimeout(() => {
        // navbar.style.backgroundColor = activeSlide.backgroundColor;
        homepage.style.backgroundColor = activeSlide.backgroundColor;

        // Re-enable transition for future changes
        navbar.style.transition = "";
        homepage.style.transition = "";
      }, 10);

      // Apply smooth transition effect to images
      const images = document.querySelectorAll(".splide__slide .image img");
      images.forEach((img) => {
        img.style.transition = "opacity 0.5s ease"; // Set transition property
        setTimeout(() => {
          img.style.opacity = 1; // Fade in the image
        }, 100);
      });
    });

    // Trigger the 'moved' event to set initial navbar and homepage background color
    slider.emit("moved");
  });