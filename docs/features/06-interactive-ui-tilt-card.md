# Feature F6: Interactive 3D Tilt Card & CSS Glassmorphism

```mermaid
flowchart TD
    subgraph Viewport["Browser Viewport Event Listeners"]
        Move["document.mousemove (e.pageX, e.pageY)"]
        Leave["document.mouseleave"]
        ClickUp["#signUp.click"]
        ClickIn["#signIn.click"]
    end

    subgraph ScriptLogic["Vanilla JS Engine (login.html:453-473)"]
        CheckWidth{window.innerWidth < 768px?}
        Calc["Compute deltaX & deltaY / 25"]
        Clamp["Math.min(Math.max(angle, -10), 10)"]
        Apply["container.style.transform = rotateY() rotateX()"]
        Reset["container.style.transform = rotateY(0) rotateX(0)"]
        AddClass["container.classList.add('active')"]
        RemClass["container.classList.remove('active')"]
    end

    subgraph RenderTree["GPU Render Layer"]
        GPU3D["#tiltCard 3D Perspective Matrix"]
        SlideAnim[".overlay slide transform: translateX(50%)"]
    end

    Move --> CheckWidth
    CheckWidth -->|Desktop| Calc --> Clamp --> Apply --> GPU3D
    CheckWidth -->|Mobile| Ignore[Bypass Tilt]
    Leave --> Reset --> GPU3D
    ClickUp --> AddClass --> SlideAnim
    ClickIn --> RemClass --> SlideAnim
```

---

## 1. Overview & User-Facing Behavior

Feature **F6** provides an interface with modern visual aesthetics that sets the portal apart from traditional generic login screens:
1. **Glassmorphism Aesthetic**: Translucent cards with `backdrop-filter: blur(20px)`, subtle borders (`rgba(255, 255, 255, 0.8)`), and soft drop shadows.
2. **Ambient Particle Orbs**: Three radial gradient circular orbs with Gaussian blur filters (`filter: blur(90px)`) that float in the background via CSS keyframe animations.
3. **3D Interactive Parallax Mouse Tilt**: The authentication card dynamically tracks mouse position across the screen, rotating along the X and Y axes in response to the user's cursor.
4. **Sliding Dual-Panel Animation**: Clicking "Sign Up" or "Sign In" slides an overlay across the card with cubic-bezier timing, swapping visible forms smoothly without page reloads.
5. **Mobile Responsiveness**: Automatically disables 3D rotation and stacks panels vertically on viewport widths below 768px.

---

## 2. Code Trace & Function Level Reference

| Hop | File & Location | Function / Construct | Parameters | Return Value | Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Tilt Listener** | [`login.html:461-468`](file:///Users/avishjain/avishjain9-repos/54-login-auth-portal/login.html#L461-L468) | `document.addEventListener('mousemove', (e) => ...)` | MouseEvent `e` | Void | Computes viewport cursor offsets and updates CSS transforms on the card. |
| **Responsive Guard**| [`login.html:462`](file:///Users/avishjain/avishjain9-repos/54-login-auth-portal/login.html#L462) | `if (window.innerWidth < 768) return;` | Viewport width check | Void | Disables GPU-intensive tilt calculations on mobile and touch devices. |
| **Angle Clamping** | [`login.html:465-466`](file:///Users/avishjain/avishjain9-repos/54-login-auth-portal/login.html#L465-L466) | `Math.min(Math.max(angle, -10), 10)` | Computed angle | Clamped degree | Limits 3D perspective rotation to $\pm 10^\circ$ preventing distortion. |
| **Tilt Reset** | [`login.html:470-472`](file:///Users/avishjain/avishjain9-repos/54-login-auth-portal/login.html#L470-L472) | `document.addEventListener('mouseleave', () => ...)` | Event | Void | Smoothly returns the card to neutral rotation (`rotateY(0deg) rotateX(0deg)`). |
| **Panel Toggles** | [`login.html:458-459`](file:///Users/avishjain/avishjain9-repos/54-login-auth-portal/login.html#L458-L459) | `signUpButton.addEventListener('click', ...)` | Click event | Void | Toggles the `.active` CSS class to trigger overlay sliding animations. |

---

## 3. Diagrams

### Full Interaction Sequence Diagram

```mermaid
sequenceDiagram
    autonumber
    actor User as Visitor / Clinician
    participant Mouse as Cursor Position (e.pageX, e.pageY)
    participant DOM as Document Event Handlers
    participant Card as #tiltCard Container
    participant GPU as GPU Compositor

    User->>Mouse: Moves cursor across viewport
    Mouse->>DOM: mousemove event
    DOM->>DOM: Check viewport: window.innerWidth >= 768
    DOM->>DOM: Calculate rotateX & rotateY
    DOM->>Card: card.style.transform = rotateY(...) rotateX(...)
    Card->>GPU: Hardware-accelerated 3D transform applied
    GPU-->>User: Visual 3D tilt update rendered at 60 FPS
    
    User->>DOM: Clicks #signUp button
    DOM->>Card: card.classList.add("active")
    Card->>GPU: CSS transition triggers overlay slide
    GPU-->>User: Smooth sliding panel reveals registration form
```

### Component Hierarchy & Styling Tree

```mermaid
flowchart TD
    Body["body (Background cream & Noise overlay SVG)"]
    Ambient["div.ambient-light"]
    Orb1["div.orb.orb-1 (Primary Teal Blur 90px)"]
    Orb2["div.orb.orb-2 (Accent Gold Blur 90px)"]
    Orb3["div.orb.orb-3 (Soft Cyan Blur 90px)"]
    
    Card["div.wrapper#tiltCard (Glass Surface & 3D Transform)"]
    SignUpForm["div.form-container.sign-up-container"]
    SignInForm["div.form-container.sign-in-container"]
    Overlay["div.overlay-container -> div.overlay"]
    LeftPanel["div.overlay-panel.overlay-left"]
    RightPanel["div.overlay-panel.overlay-right"]

    Body --> Ambient --> Orb1 & Orb2 & Orb3
    Body --> Card
    Card --> SignUpForm
    Card --> SignInForm
    Card --> Overlay --> LeftPanel & RightPanel
```

### Lifecycle State Machine

```mermaid
stateDiagram-v2
    [*] --> NeutralState: Page loaded (tilt = 0deg)
    NeutralState --> TrackingMouse: Cursor enters desktop viewport
    TrackingMouse --> Rotating3D: Cursor moves (transforms updated)
    Rotating3D --> TrackingMouse: Continuous cursor updates
    Rotating3D --> NeutralState: Cursor leaves window (mouseleave)
    NeutralState --> MobileStacked: Viewport resized < 768px
    TrackingMouse --> MobileStacked: Viewport resized < 768px
    MobileStacked --> NeutralState: Viewport resized >= 768px
```

### Fallback & Responsive Breakpoint Diagram

```mermaid
flowchart LR
    Screen{Screen Width}
    Screen -->|>= 768px Desktop| D1["Dual horizontal panels (850x550px)"]
    D1 --> D2["Active 3D tilt mouse tracking"]
    D1 --> D3["Sliding horizontal overlay"]
    
    Screen -->|< 768px Mobile| M1["Vertical stacked layout (650px height)"]
    M1 --> M2["3D tilt bypassed (No CPU/GPU drain)"]
    M1 --> M3["Vertical overlay translation"]
```

---

## 4. Edge Cases, Security & Engineering Quality

1. **GPU Acceleration & Jitter Prevention**:
   - The tilt card uses `transform-style: preserve-3d` and `perspective: 1000px` on the body. Applying transforms directly on the card ensures that the browser uses the GPU compositing thread rather than triggering expensive layout reflows.
2. **Mobile Touch Guard**:
   - Touch devices do not emit standard continuous `mousemove` coordinates and tilt transforms can interfere with finger scrolling. The breakpoint guard `if (window.innerWidth < 768) return;` prevents broken gestures on mobile.
3. **Floating Point Overflow / Rapid Mouse Movements**:
   - Clamping with `Math.min(Math.max(angle, -10), 10)` guarantees the card never flips past $10^\circ$, maintaining readability and preventing input distortion.

---

## 5. Say It Out Loud

> For the user interface, I wanted something that would immediately impress users and feel modern, rather than looking like another generic bootstrap form. I designed an interactive glassmorphic authentication card with pure CSS and vanilla JavaScript.
>
> In the background, three ambient gradient orbs float with a ninety-pixel blur, giving the screen depth. The card itself uses backdrop filters to create a frosted glass aesthetic with subtle light borders.
>
> To make the card feel alive, I wrote a custom 3D mouse parallax tilt engine in vanilla JavaScript. As the user moves their cursor across the screen, the listener calculates the mouse offset relative to the viewport center, divides it by twenty-five, and clamps the angle between negative ten and positive ten degrees. Then it applies a three-D rotateY and rotateX transform directly to the card container on the GPU compositing thread.
>
> When the user clicks sign up, an event listener toggles the active class, which triggers hardware-accelerated CSS transforms to smoothly slide the overlay and switch between the login and registration forms.
>
> On screens below seven hundred sixty-eight pixels, the script automatically shuts off the mouse tracking to prevent touch scrolling issues and stacks the layout vertically.
>
> I deliberately avoided importing React or external animation libraries like Three.js or GSAP here. Writing it in vanilla JavaScript keeps our client payload completely lightweight and ensures instantaneous page loading.
