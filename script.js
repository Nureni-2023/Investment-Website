document.addEventListener('DOMContentLoaded', () => {
  // --- Dashboard Specific ---
  const dots = document.querySelectorAll('.dot');
  let activeDotIndex = 0;

  function updateDots() {
      dots.forEach((dot, index) => {
          if (index === activeDotIndex) {
              dot.classList.add('active');
          } else {
              dot.classList.remove('active');
          }
      });
  }
  updateDots();

  // --- Page Switching Logic ---
  const dashboardHeader = document.getElementById('dashboard-header');
  const packagesHeader = document.getElementById('packages-header');
  const invitationHeader = document.getElementById('invitation-header');
  const profileHeader = document.getElementById('profile-header');

  const dashboardContent = document.getElementById('dashboard-content');
  const packagesContent = document.getElementById('packages-content');
  const invitationContent = document.getElementById('invitation-content');
  const profileContent = document.getElementById('profile-content');

  const homeNavItem = document.getElementById('home-nav');
  const investNavItem = document.getElementById('invest-nav');
  const inviteFriendsNavItem = document.getElementById('invite-friends-nav');
  const profileNavItem = document.getElementById('profile-nav');
  const navItems = document.querySelectorAll('.nav-item');
  const backArrows = document.querySelectorAll('.back-arrow');


  function hideAllContentAndHeaders() {
      dashboardHeader.classList.add('hidden');
      packagesHeader.classList.add('hidden');
      invitationHeader.classList.add('hidden');
      profileHeader.classList.add('hidden');
      dashboardContent.classList.add('hidden');
      packagesContent.classList.add('hidden');
      invitationContent.classList.add('hidden');
      profileContent.classList.add('hidden');
  }

  function setActiveNavItem(activeItem) {
      navItems.forEach(item => item.classList.remove('active'));
      activeItem.classList.add('active');
  }

  function showDashboard() {
      hideAllContentAndHeaders();
      dashboardHeader.classList.remove('hidden');
      dashboardContent.classList.remove('hidden');
      setActiveNavItem(homeNavItem);
  }

  function showPackages() {
      hideAllContentAndHeaders();
      packagesHeader.classList.remove('hidden');
      packagesContent.classList.remove('hidden');
      setActiveNavItem(investNavItem);
  }

  function showInvitation() {
      hideAllContentAndHeaders();
      invitationHeader.classList.remove('hidden');
      invitationContent.classList.remove('hidden');
      setActiveNavItem(inviteFriendsNavItem);
  }

  function showProfile() {
      hideAllContentAndHeaders();
      profileHeader.classList.remove('hidden');
      profileContent.classList.remove('hidden');
      setActiveNavItem(profileNavItem);
  }


  // Event Listeners for Bottom Navigation
  homeNavItem.addEventListener('click', (e) => {
      e.preventDefault();
      showDashboard();
  });

  investNavItem.addEventListener('click', (e) => {
      e.preventDefault();
      showPackages();
  });

  inviteFriendsNavItem.addEventListener('click', (e) => {
      e.preventDefault();
      showInvitation();
  });

  profileNavItem.addEventListener('click', (e) => {
      e.preventDefault();
      showProfile();
  });


  // Event Listener for Back Arrow (common for all sub-pages)
  backArrows.forEach(arrow => {
      arrow.addEventListener('click', (e) => {
          e.preventDefault();
          showDashboard(); // Always go back to dashboard
      });
  });

  // --- Invitation Page Specific Functionality ---
  const copyButton = document.querySelector('.copy-button');
  if (copyButton) {
      copyButton.addEventListener('click', () => {
          const inviteLinkInput = document.getElementById('inviteLinkInput');
          if (inviteLinkInput) {
              inviteLinkInput.select();
              inviteLinkInput.setSelectionRange(0, 99999);
              document.execCommand('copy');
              copyButton.textContent = 'Copied!';
              setTimeout(() => {
                  copyButton.textContent = 'Copy';
              }, 1500);
          }
      });
  }

  // --- Dynamic Flower Background Animation ---
  const numberOfFlowers = 20; // Adjust as needed for density
  const bodyElement = document.body;
  const maxAnimationDuration = 20; // seconds
  const minAnimationDuration = 10; // seconds

  for (let i = 0; i < numberOfFlowers; i++) {
      const flower = document.createElement('div');
      flower.classList.add('flower');

      // Randomize initial horizontal position
      const startX = Math.random() * window.innerWidth;
      // Randomize ending horizontal position (to allow for diagonal movement)
      const endX = Math.random() * window.innerWidth;
      // Randomize size
      const scale = 0.5 + Math.random(); // From 0.5 to 1.5
      // Randomize rotation
      const rotateEnd = Math.random() * 720 - 360; // -360 to +360 degrees
      // Randomize opacity
      const maxOpacity = 0.1 + Math.random() * 0.3; // From 0.1 to 0.4

      // Randomize animation duration
      const duration = minAnimationDuration + (Math.random() * (maxAnimationDuration - minAnimationDuration));
      // Randomize animation delay to stagger appearance
      const delay = Math.random() * maxAnimationDuration; // Delay can be up to max duration

      flower.style.setProperty('--start-x', `${startX}px`);
      flower.style.setProperty('--end-x', `${endX}px`);
      flower.style.setProperty('--scale', scale);
      flower.style.setProperty('--rotate-end', `${rotateEnd}deg`);
      flower.style.setProperty('--max-opacity', maxOpacity);

      flower.style.animation = `flowAnimation ${duration}s linear ${delay}s infinite`;

      bodyElement.appendChild(flower);

      // Optional: Remove flower when animation ends to prevent accumulation
      // and restart animation (creating a continuous loop of fresh flowers)
      flower.addEventListener('animationend', () => {
          // Re-randomize properties for the next loop (making it truly infinite)
          const newStartX = Math.random() * window.innerWidth;
          const newEndX = Math.random() * window.innerWidth;
          const newScale = 0.5 + Math.random();
          const newRotateEnd = Math.random() * 720 - 360;
          const newMaxOpacity = 0.1 + Math.random() * 0.3;
          const newDuration = minAnimationDuration + (Math.random() * (maxAnimationDuration - minAnimationDuration));
          const newDelay = Math.random() * 2; // Shorter delay for restart

          flower.style.animation = 'none'; // Reset animation
          void flower.offsetWidth; // Trigger reflow
          flower.style.setProperty('--start-x', `${newStartX}px`);
          flower.style.setProperty('--end-x', `${newEndX}px`);
          flower.style.setProperty('--scale', newScale);
          flower.style.setProperty('--rotate-end', `${newRotateEnd}deg`);
          flower.style.setProperty('--max-opacity', newMaxOpacity);
          flower.style.animation = `flowAnimation ${newDuration}s linear ${newDelay}s infinite`;
      });
  }


  // Initialize to show dashboard on page load
  showDashboard();
});