<div align="center">

![Ecom Banner](src/assets/images/Home_Page.png)

# 🚀 Ecom-Client

### A Premium, Modern E-commerce Frontend built with Angular 17

[![Angular](https://img.shields.io/badge/Angular-17+-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3+-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-626CD9?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

[Explore the Docs](#) · [Report Bug](#) · [Request Feature](#)

</div>

## 📖 Overview

**Ecom-Client** is a state-of-the-art e-commerce frontend designed for performance, scalability, and an exceptional user experience. Built using **Angular 17**, it leverages modern web technologies like **Server-Side Rendering (SSR)**, **RxJS** for reactive state management, and **Stripe** for secure, seamless payments.

Whether you're browsing products, managing your cart, or checking out, every interaction is polished with smooth animations and intuitive UI elements.

---

## ✨ Key Features

- 🛍️ **Dynamic Shop**: Real-time product filtering, searching, and sorting.
- 🛒 **Advanced Basket**: Persistent shopping cart with real-time updates.
- 💳 **Secure Checkout**: Full integration with Stripe for safe transactions.
- 🔐 **Identity Management**: Robust Login, Register, and Account management systems.
- 📦 **Order History**: Comprehensive tracking and history of all user orders.
- 📱 **Fully Responsive**: Optimized for every device, from mobile to ultra-wide monitors.
- ⚡ **Performance First**: Optimized with Angular SSR and efficient change detection.
- 🎨 **Modern UI**: Clean, glassmorphism-inspired design with Angular Material components.

---

## 🛠️ Tech Stack

### **Core**
- **Framework**: [Angular 17+](https://angular.io/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [RxJS](https://rxjs.dev/)
- **Routing**: Angular Router (Standalone Components)

### **UI & Styling**
- **Styling**: Bootstrap 5 & Vanilla SCSS
- **Components**: Angular Material & ngx-bootstrap
- **Icons**: Font Awesome 4 & Material Icons
- **Feedback**: ngx-toastr & ngx-spinner

### **Integration**
- **Payments**: @stripe/stripe-js
- **Utility**: UUID for unique identifiers

---

## 📸 Preview

<div align="center">
  <img src="file:///C:/Users/Youssef/.gemini/antigravity/brain/23a126fd-8861-4520-96b3-a0a3e7fba4cb/ecom_ui_preview_1777225151378.png" alt="UI Preview" width="80%">
</div>

---

## 📂 Project Structure

```text
src/app/
├── core/           # Interceptors, Guards, Singleton Services
├── shared/         # Reusable components, models, and pipes
├── shop/           # Product catalog and details
├── basket/         # Cart management logic
├── checkout/       # Multi-step checkout process
├── orders/         # Order tracking and history
├── identity/       # Authentication and User profile
└── home/           # Landing page content
```

---

## ⚙️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or later)
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Yousef-116/Ecom-Client.git
   cd Ecom-Client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Open `src/app/environment.ts` and add your API URL and Stripe Public Key.

4. **Run Development Server**
   ```bash
   ng serve
   ```
   Navigate to `http://localhost:4200/`.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  Made with ❤️ by [Yousef](https://github.com/Yousef-116)
</div>
