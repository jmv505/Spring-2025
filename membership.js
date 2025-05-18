// membership.js: Auto-select membership in form when card is clicked

document.addEventListener('DOMContentLoaded', function() {


    const cards = document.querySelectorAll('.membership-card');
    const select = document.getElementById('membership');
    if (cards.length && select) {
        cards.forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', function() {
                // Remove highlight from all
                cards.forEach(c => c.classList.remove('selected'));
                // Highlight selected
                card.classList.add('selected');
                // Select the form option
                const type = card.querySelector('h3').innerText.toLowerCase();
                select.value = type;
            });
        });
    }

    // Show/hide parent info based on age
    const ageInput = document.getElementById('age');
    const parentInfo = document.getElementById('parent-info');
    const parentName = document.getElementById('parent-name');
    const parentPhone = document.getElementById('parent-phone');
    const parentEmail = document.getElementById('parent-email');
    const parentConsent = document.getElementById('parent-consent');
    function toggleParentInfo() {
        const age = parseInt(ageInput.value, 10);
        if (!isNaN(age) && age < 13) {
            parentInfo.style.display = '';
            parentName.required = true;
            parentPhone.required = true;
            parentEmail.required = true;
            parentConsent.required = true;
        } else {
            parentInfo.style.display = 'none';
            parentName.required = false;
            parentPhone.required = false;
            parentEmail.required = false;
            parentConsent.required = false;
            // Optionally clear errors and values
            if (document.getElementById('parent-phone-error')) document.getElementById('parent-phone-error').textContent = '';
            if (document.getElementById('parent-email-error')) document.getElementById('parent-email-error').textContent = '';
            if (document.getElementById('parent-consent-error')) document.getElementById('parent-consent-error').textContent = '';
            parentPhone.value = '';
            parentEmail.value = '';
            parentConsent.checked = false;
        }
    }
    if (ageInput && parentInfo && parentName && parentPhone) {
        ageInput.addEventListener('input', toggleParentInfo);
        toggleParentInfo();
    }

    // --- Avatar/Image Profile Logic ---
    // Remove legacy variables
    let avatarChooserOpen = false;
    let cropperOpen = false;
    // Prevent form submit if avatar chooser or cropper is open
    const membershipForm = document.getElementById('membership-form');
    if (membershipForm) {
        membershipForm.addEventListener('submit', function(e) {
            const avatarWindow = document.getElementById('avatar-chooser-window');
            const cropperOverlay = document.getElementById('profile-overlay');
            if ((avatarWindow && avatarWindow.style.display !== 'none') || (cropperOverlay && cropperOverlay.style.display !== 'none')) {
                e.preventDefault();
            }
        });
        // Force restore avatar on any input/focus in the form
        membershipForm.addEventListener('input', function() {
            const saved = localStorage.getItem('profilePicture');
            if (saved) {
                const {src, isEmoji} = JSON.parse(saved);
                setProfilePicture(src, isEmoji);
            }
        });
        membershipForm.addEventListener('focusin', function() {
            const saved = localStorage.getItem('profilePicture');
            if (saved) {
                const {src, isEmoji} = JSON.parse(saved);
                setProfilePicture(src, isEmoji);
            }
        });
    }
    const avatars = [
        // Sports & Fitness
        '🏋️‍♂️', '🏋️‍♀️', '🏋️', '🤸‍♂️', '🤸‍♀️', '🤸', '🚴‍♂️', '🚴‍♀️', '🚴', '🏃‍♂️', '🏃‍♀️', '🏃',
        '🧘‍♂️', '🧘‍♀️', '🧘', '🤾‍♂️', '🤾‍♀️', '🤾', '🏊‍♂️', '🏊‍♀️', '🏊', '🤼‍♂️', '🤼‍♀️', '🤼',
        '🤽‍♂️', '🤽‍♀️', '🤽', '🤹‍♂️', '🤹‍♀️', '🤹', '⛹️‍♂️', '⛹️‍♀️', '⛹️', '🏌️‍♂️', '🏌️‍♀️', '🏌️',
        '🚣‍♂️', '🚣‍♀️', '🚣', '🏇', '🏂', '⛷️', '🏄‍♂️', '🏄‍♀️', '🏄', '🛹', '🛷',
        // Professions & Fun
        '🧑‍🎤', '🧑‍🚀', '🧑‍🍳', '🧑‍🎓', '🧑‍🔬', '🧑‍💻', '🧑‍🏫', '🧑‍🚒', '🧑‍✈️', '🧑‍⚖️',
        '🦸‍♂️', '🦸‍♀️', '🦸', '🦹‍♂️', '🦹‍♀️', '🦹', '🧙‍♂️', '🧙‍♀️', '🧙', '🧚‍♂️', '🧚‍♀️', '🧚',
        '🧛‍♂️', '🧛‍♀️', '🧛', '🧟‍♂️', '🧟‍♀️', '🧟', '🧞‍♂️', '🧞‍♀️', '🧞', '🧜‍♂️', '🧜‍♀️', '🧜',
        // Diversity, Abilities, Accessories
        '🧑‍🦽', '🧑‍🦼', '🧑‍🦯', '🧑‍🍼', '🧑‍🤝‍🧑', '🧑‍🤝‍🧑', '🧑‍🦰', '🧑‍🦱', '🧑‍🦳', '🧑‍🦲',
        '💪', '🦵', '🦶', '👟', '🎽', '🥇', '🥈', '🥉', '🧢', '🎒', '🧤', '🧦', '🦺',
        // Faces & Expressions
        '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', 
        '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', 
        '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', 
        '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', 
        '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', 
        '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', 
        '😷', '🤒', '🤕', '🤑', '🤠', '😈', '👿', '👹', '👺', '💀', '👻', '👽', '🤖',
        // Animals for fun (expanded)
        '🐻', '🐼', '🐨', '🦁', '🐯', '🐶', '🐱', '🐵', '🐸', '🐧', '🐦', '🐤',
        '🐔', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇', '🦢', '🦩', '🦚', '🦜',
        '🦄', '🐴', '🦓', '🦌', '🐂', '🐃', '🐄', '🐖', '🐗', '🐏', '🐑', '🐐',
    ];
    const profilePictureEmoji = document.getElementById('profile-picture-emoji');
    const profilePicture = document.getElementById('profile-picture');
    const chooseAvatarBtn = document.getElementById('choose-avatar');
    const uploadBtn = document.getElementById('upload-btn');
    const uploadInput = document.getElementById('upload-image');
    const avatarChooser = document.getElementById('avatar-chooser');
    const avatarWindow = document.getElementById('avatar-chooser-window');

    // Emoji avatars

    function styleAvatarBtn(btn, selected) {
        btn.style.fontSize = '28px';
        btn.style.margin = '3px';
        btn.style.border = selected ? '2.5px solid #1976d2' : '1px solid #ccc';
        btn.style.background = selected ? '#e3f2fd' : '#fff';
        btn.style.borderRadius = '6px';
        btn.style.transition = 'border 0.15s, background 0.15s';
        btn.onfocus = () => btn.style.background = '#bbdefb';
        btn.onblur = () => btn.style.background = selected ? '#e3f2fd' : '#fff';
    }
    function showImage(src) {
        profilePictureEmoji.style.display = 'none';
        profilePicture.style.display = 'inline-block';
        profilePicture.src = src;
    }
    // Show an emoji avatar in the profile circle
    function showEmoji(emoji) {
        profilePicture.style.display = 'none';
        profilePictureEmoji.style.display = 'inline-block';
        profilePictureEmoji.textContent = emoji;
    }
    // Set and persist the avatar (image or emoji)
    function setProfilePicture(src, isEmoji = false) {
        if (isEmoji) {
            showEmoji(src);
        } else {
            showImage(src);
        }
        localStorage.setItem('profilePicture', JSON.stringify({src, isEmoji}));
    }

    chooseAvatarBtn.onclick = function () {
        const avatarWindow = document.getElementById('avatar-chooser-window');
        let confirmBtn = document.getElementById('confirm-avatar-btn');
        avatarChooser.innerHTML = '';
        avatarWindow.style.display = 'block';
        avatarChooser.style.display = 'flex';
        avatarChooser.style.flexWrap = 'nowrap';
        let selectedBtn = null;
        let selectedIdx = null;
        avatarChooserOpen = true;
        // Hide confirm button, not needed anymore
        confirmBtn.style.display = 'none';
        // Show the user's current avatar as selected if it's in the list
        const saved = localStorage.getItem('profilePicture');
        let currentAvatar = null, currentIsEmoji = false;
        if (saved) {
            const obj = JSON.parse(saved);
            currentAvatar = obj.src;
            currentIsEmoji = obj.isEmoji;
        }
        // Add robust outside click handler
        if (window._avatarChooserOutsideClickHandler) {
            document.removeEventListener('mousedown', window._avatarChooserOutsideClickHandler, true);
            window._avatarChooserOutsideClickHandler = null;
        }
        // Only close the chooser window, do NOT touch the avatar or image
    window._avatarChooserOutsideClickHandler = function(e) {
        if (!avatarWindow.contains(e.target) && e.target !== chooseAvatarBtn) {
            avatarWindow.style.display = 'none';
            avatarChooserOpen = false;
            document.removeEventListener('mousedown', window._avatarChooserOutsideClickHandler, true);
            window._avatarChooserOutsideClickHandler = null;
        }
    };

        setTimeout(function() {
            document.addEventListener('mousedown', window._avatarChooserOutsideClickHandler, true);
        }, 0);
        // Show current avatar as selected if it's in the list
        avatars.forEach((emoji, idx) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.textContent = emoji;
            let isSelected = (currentAvatar === emoji && currentIsEmoji);
            styleAvatarBtn(btn, isSelected);
            if (isSelected) {
                selectedBtn = btn;
                selectedIdx = idx;
            }
            btn.onclick = () => {
                if (selectedBtn) styleAvatarBtn(selectedBtn, false);
                selectedBtn = btn;
                selectedIdx = idx;
                styleAvatarBtn(btn, true);
                // Instantly set and save avatar
                setProfilePicture(emoji, true);
                // Avatar (emoji) logic is now identical to image logic: always show and persist
            };
            avatarChooser.appendChild(btn);
        });
        // No confirm button logic needed anymore
        // Show current avatar as selected if it's in the list
        if (currentAvatar) {
            setProfilePicture(currentAvatar, currentIsEmoji);
        }
    };



    uploadBtn.onclick = function () {
        if (avatarChooserOpen) return; // Prevent opening upload while avatar chooser is open
        uploadInput.value = '';
        document.getElementById('upload-error').style.display = 'none';
        document.getElementById('profile-cropper-container').style.display = 'none';
        uploadInput.click();
    };

    // --- Canvas Cropper State ---
    let cropperImg = null;
    let cropperState = {
        x: 0, y: 0, scale: 1, dragging: false, dragStartX: 0, dragStartY: 0, imgStartX: 0, imgStartY: 0
    };

    uploadInput.onchange = function (e) {
        if (avatarChooserOpen) return; // Prevent upload if avatar chooser is open
        const file = e.target.files[0];
        const errorDiv = document.getElementById('upload-error');
        const cropperOverlay = document.getElementById('profile-overlay');
        const cropperContainer = document.getElementById('profile-cropper-container');
        const cropperCanvas = document.getElementById('profile-image-cropper');
        errorDiv.style.display = 'none';
        cropperOverlay.style.display = 'flex';
        cropperContainer.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scroll
        cropperOpen = true;
        if (!file) return;
        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            errorDiv.textContent = 'Only JPG, PNG, GIF, or WEBP images are allowed.';
            errorDiv.style.display = 'block';
            return;
        }
        // Validate file size (max 8MB)
        if (file.size > 8 * 1024 * 1024) {
            errorDiv.textContent = 'Image size must be less than 8MB.';
            errorDiv.style.display = 'block';
            return;
        }
        // Load image for cropping
        const reader = new FileReader();
        reader.onload = function (evt) {
            cropperImg = new window.Image();
            cropperImg.onload = function () {
                // Fit image to cropper canvas (original logic, no forced zoom in or out)
                cropperState.scale = Math.max(
                    cropperCanvas.width / cropperImg.width,
                    cropperCanvas.height / cropperImg.height
                ); // This will automatically use the new canvas size
                cropperState.x = (cropperCanvas.width - cropperImg.width * cropperState.scale) / 2;
                cropperState.y = (cropperCanvas.height - cropperImg.height * cropperState.scale) / 2;
                drawCropper();
                cropperContainer.style.display = 'block';
                cropperOverlay.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            };
            cropperImg.src = evt.target.result;
        };
        reader.readAsDataURL(file);
    };

    // --- Canvas Cropper Logic ---
    function drawCropper() {
        const canvas = document.getElementById('profile-image-cropper');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw circle mask
        ctx.save();
        ctx.beginPath();
        ctx.arc(canvas.width/2, canvas.height/2, canvas.width/2, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.clip();
        if (cropperImg) {
            ctx.drawImage(
                cropperImg,
                cropperState.x, cropperState.y,
                cropperImg.width * cropperState.scale,
                cropperImg.height * cropperState.scale
            );
        }
        ctx.restore();
        // Optional: draw circle border
        ctx.beginPath();
        ctx.arc(canvas.width/2, canvas.height/2, canvas.width/2-1, 0, 2 * Math.PI);
        ctx.strokeStyle = '#1976d2';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    // Drag and Touch logic
    const cropperCanvas = document.getElementById('profile-image-cropper');
    // Mouse events
    cropperCanvas.addEventListener('mousedown', function(e) {
        if (!cropperImg) return;
        cropperState.dragging = true;
        cropperState.dragStartX = e.offsetX;
        cropperState.dragStartY = e.offsetY;
        cropperState.imgStartX = cropperState.x;
        cropperState.imgStartY = cropperState.y;
    });
    cropperCanvas.addEventListener('mousemove', function(e) {
        if (!cropperImg || !cropperState.dragging) return;
        const dx = e.offsetX - cropperState.dragStartX;
        const dy = e.offsetY - cropperState.dragStartY;
        cropperState.x = cropperState.imgStartX + dx;
        cropperState.y = cropperState.imgStartY + dy;
        drawCropper();
    });
    cropperCanvas.addEventListener('mouseup', function(e) {
        cropperState.dragging = false;
    });
    cropperCanvas.addEventListener('mouseleave', function(e) {
        cropperState.dragging = false;
    });
    // Touch events
    let lastTouchDist = null;
    let lastTouchMid = null;
    cropperCanvas.addEventListener('touchstart', function(e) {
        if (!cropperImg) return;
        if (e.touches.length === 1) {
            // single finger drag
            cropperState.dragging = true;
            cropperState.dragStartX = e.touches[0].clientX;
            cropperState.dragStartY = e.touches[0].clientY;
            cropperState.imgStartX = cropperState.x;
            cropperState.imgStartY = cropperState.y;
        } else if (e.touches.length === 2) {
            // pinch zoom
            lastTouchDist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            lastTouchMid = {
                x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
                y: (e.touches[0].clientY + e.touches[1].clientY) / 2
            };
        }
    }, {passive:false});
    cropperCanvas.addEventListener('touchmove', function(e) {
        if (!cropperImg) return;
        if (e.touches.length === 1 && cropperState.dragging) {
            // single finger drag
            const dx = e.touches[0].clientX - cropperState.dragStartX;
            const dy = e.touches[0].clientY - cropperState.dragStartY;
            cropperState.x = cropperState.imgStartX + dx;
            cropperState.y = cropperState.imgStartY + dy;
            drawCropper();
        } else if (e.touches.length === 2) {
            // pinch zoom
            const dist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            const mid = {
                x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
                y: (e.touches[0].clientY + e.touches[1].clientY) / 2
            };
            if (lastTouchDist) {
                let scaleChange = dist / lastTouchDist;
                // Clamp zoom
                cropperState.scale = Math.max(0.25, Math.min(4, cropperState.scale * scaleChange));
                // Optionally, adjust position to zoom around midpoint
                // (not required for small previews)
                drawCropper();
            }
            lastTouchDist = dist;
            lastTouchMid = mid;
        }
        e.preventDefault();
    }, {passive:false});
    cropperCanvas.addEventListener('touchend', function(e) {
        cropperState.dragging = false;
        if (e.touches.length < 2) {
            lastTouchDist = null;
            lastTouchMid = null;
        }
    });
    // Overlay click to close
    document.getElementById('profile-overlay').addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
            document.getElementById('profile-cropper-container').style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    // Zoom logic
    document.getElementById('zoom-in').onclick = function() {
        if (!cropperImg) return;
        cropperState.scale *= 1.15;
        drawCropper();
    };
    document.getElementById('zoom-out').onclick = function() {
        if (!cropperImg) return;
        cropperState.scale /= 1.15;
        drawCropper();
    };
    // Confirm crop
    let confirmBtn = document.getElementById('confirm-image-btn');
    if (!confirmBtn) {
        confirmBtn = document.createElement('button');
        confirmBtn.id = 'confirm-image-btn';
        confirmBtn.type = 'button';
        confirmBtn.textContent = 'Set as Profile Picture';
        confirmBtn.style.margin = '10px auto 0';
        confirmBtn.style.display = 'block';
        confirmBtn.style.background = '#1976d2';
        confirmBtn.style.color = '#fff';
        confirmBtn.style.border = 'none';
        confirmBtn.style.padding = '7px 18px';
        confirmBtn.style.borderRadius = '5px';
        confirmBtn.style.fontWeight = 'bold';
        confirmBtn.style.cursor = 'pointer';
        cropperCanvas.insertAdjacentElement('afterend', confirmBtn);
    }
    confirmBtn.onclick = function() {
        // Crop to circle and save as image
        const canvas = document.createElement('canvas');
        canvas.width = cropperCanvas.width;
        canvas.height = cropperCanvas.height;
        const ctx = canvas.getContext('2d');
        ctx.save();
        ctx.beginPath();
        ctx.arc(canvas.width/2, canvas.height/2, canvas.width/2, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(
            cropperImg,
            cropperState.x, cropperState.y,
            cropperImg.width * cropperState.scale,
            cropperImg.height * cropperState.scale
        );
        ctx.restore();
        // Export as PNG
        const dataUrl = canvas.toDataURL('image/png');
        setProfilePicture(dataUrl, false);
        // Restore screen to normal and keep the image
        if (cropperOverlay) cropperOverlay.style.display = 'none';
        if (cropperContainer) cropperContainer.style.display = 'none';
        document.body.style.overflow = '';
        if (confirmBtn) confirmBtn.remove();
    };



    // Style avatar grid and buttons
    function styleAvatarBtn(btn, selected) {
        btn.style.fontSize = '32px';
        btn.style.margin = '4px';
        btn.style.padding = '7px 10px';
        btn.style.border = selected ? '2.5px solid #1976d2' : '1px solid #bbb';
        btn.style.background = selected ? '#e3f2fd' : '#fff';
        btn.style.borderRadius = '10px';
        btn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.09)';
        btn.style.cursor = 'pointer';
        btn.style.transition = 'background 0.18s, border 0.18s';
        btn.onmouseenter = () => btn.style.background = '#e3f2fd';
        btn.onmouseleave = () => btn.style.background = selected ? '#e3f2fd' : '#fff';
        btn.onfocus = () => btn.style.background = '#bbdefb';
        btn.onblur = () => btn.style.background = selected ? '#e3f2fd' : '#fff';
    }

    chooseAvatarBtn.onclick = function () {
        const avatarWindow = document.getElementById('avatar-chooser-window');
        const avatarChooser = document.getElementById('avatar-chooser');
        avatarChooser.innerHTML = '';
        avatarWindow.style.display = 'block';
        avatarChooser.style.display = 'flex';
        avatarChooser.style.flexWrap = 'nowrap';
        let selectedEmoji = null;
        avatars.forEach(emoji => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.textContent = emoji;
            styleAvatarBtn(btn, false);
            btn.onclick = () => {
                setProfilePicture(emoji, true);
                avatarWindow.style.display = 'none';
            };
            btn.onfocus = () => {
                if (selectedEmoji) styleAvatarBtn(selectedEmoji, false);
                styleAvatarBtn(btn, true);
                selectedEmoji = btn;
            };
            avatarChooser.appendChild(btn);
        });
        // Arrow logic
        const leftArrow = document.getElementById('avatar-left-arrow');
        const rightArrow = document.getElementById('avatar-right-arrow');
        function updateArrows() {
            leftArrow.style.visibility = avatarChooser.scrollLeft > 0 ? 'visible' : 'hidden';
            rightArrow.style.visibility = (avatarChooser.scrollLeft + avatarChooser.offsetWidth < avatarChooser.scrollWidth) ? 'visible' : 'hidden';
        }
        leftArrow.onclick = function(e) {
            e.stopPropagation();
            avatarChooser.scrollLeft -= 120;
            updateArrows();
        };
        rightArrow.onclick = function(e) {
            e.stopPropagation();
            avatarChooser.scrollLeft += 120;
            updateArrows();
        };
        avatarChooser.onscroll = updateArrows;
        setTimeout(updateArrows, 80);
        // Touch swipe
        let touchStartX = null, touchScrollStart = null;
        avatarChooser.addEventListener('touchstart', function(e) {
            if (e.touches.length !== 1) return;
            touchStartX = e.touches[0].clientX;
            touchScrollStart = avatarChooser.scrollLeft;
        }, {passive:true});
        avatarChooser.addEventListener('touchmove', function(e) {
            if (touchStartX === null) return;
            const dx = e.touches[0].clientX - touchStartX;
            avatarChooser.scrollLeft = touchScrollStart - dx;
        }, {passive:true});
        avatarChooser.addEventListener('touchend', function() {
            touchStartX = null;
        });
        // Remove any previous outside click handler before adding a new one
        if (window._avatarChooserOutsideClickHandler) {
            document.removeEventListener('click', window._avatarChooserOutsideClickHandler);
        }
        window._avatarChooserOutsideClickHandler = function handler(e) {
            // Check if click is outside the avatar window and not on the open button or confirm button
            if (!avatarWindow.contains(e.target) && e.target !== chooseAvatarBtn && e.target !== confirmBtn) {
                avatarWindow.style.display = 'none';
                // revert to previous avatar
                if (prevAvatar) {
                    if (prevIsEmoji) {
                        showEmoji(prevAvatar);
                    } else {
                        showImage(prevAvatar);
                    }
                } else {
                    profilePictureEmoji.style.display = 'none';
                    profilePicture.style.display = 'inline-block';
                    profilePicture.src = '';
                }
                document.removeEventListener('click', window._avatarChooserOutsideClickHandler, true);
                window._avatarChooserOutsideClickHandler = null;
            }
        };
        document.addEventListener('click', window._avatarChooserOutsideClickHandler, true);

        // Add click handler to avatar chooser to prevent closing
        avatarWindow.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // Add click handler to avatar buttons to prevent closing
        avatarChooser.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // Add click handler to confirm button to prevent closing and always confirm selection
        confirmBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (selectedBtn && selectedIdx !== null) {
                setProfilePicture(avatars[selectedIdx], true);
                avatarWindow.style.display = 'none';
            }
        });
    };


    // Remove Image/Avatar button logic (the ONLY place that clears the avatar!)
    const removeImageBtn = document.getElementById('remove-image-btn');
    if (removeImageBtn) {
        removeImageBtn.onclick = function() {
            localStorage.removeItem('profilePicture');
            profilePictureEmoji.style.display = 'none';
            profilePictureEmoji.textContent = '';
            profilePicture.style.display = 'inline-block';
            profilePicture.src = '';
        };
    }

    // Load saved profile picture/avatar on page load
    window.addEventListener('DOMContentLoaded', function () {
        const saved = localStorage.getItem('profilePicture');
        if (saved) {
            const {src, isEmoji} = JSON.parse(saved);
            setProfilePicture(src, isEmoji);
        }
    });

});
