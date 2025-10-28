# Bus Ticket Reservation System 🚌

<div align="center">

![Angular](https://img.shields.io/badge/Angular-17+-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

A modern, responsive web application for booking bus tickets with real-time seat selection, multi-seat booking, and comprehensive booking management.

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Screenshots](#-screenshots)

</div>

---

## 🎯 Features

### ✅ Core Features

#### 1. **Bus Search** 🔍
- Search buses by departure city, destination city, and journey date
- Comprehensive form validation:
  - Same city validation (prevents booking from A to A)
  - Past date validation
  - Required field validation with specific error messages
- Beautiful, responsive card-based results layout
- Real-time seat availability display
- Price and timing information
- Animated error alerts with icons

#### 2. **Advanced Seat Selection** 💺
- **Custom 2+2 Seat Layout**:
  - Visual bus seating arrangement (A1, A2 | A3, A4)
  - Aisle separation between seat pairs
  - User-friendly seat labels (A1, B2, C3, etc.)
- **Multi-Seat Selection**:
  - Book multiple seats in one transaction
  - Parallel booking using RxJS forkJoin
  - Visual feedback for all selected seats
- **Color-Coded Status**:
  - 💺 **Available** - Green (clickable)
  - ✓ **Selected** - Highlighted with checkmark
  - 🔒 **Booked** - Locked icon (unavailable)
  - ✖ **Sold** - Red X (unavailable)
- Driver position indicator (🚗)
- Reusable seat-map component

#### 3. **Booking Management** 📝
- **Passenger Details Form**:
  - Name validation (2-100 characters)
  - Mobile number validation (10-20 digits, international format)
  - Boarding point selection
  - Dropping point selection
  - Real-time validation feedback
- **Booking Summary**:
  - Selected seat labels (A1, A2, B3)
  - Individual fare display
  - Total amount calculation
  - Booking confirmation with 2-second success message

#### 4. **Ticket Management** 🎫
- **Multiple Ticket Display**:
  - Show all booked tickets
  - Professional e-ticket design
  - Seat labels displayed (not raw API numbers)
  - Status badges (Pending/Confirmed/Cancelled)
- **Ticket Actions**:
  - 🖨️ Print ticket functionality
  - ❌ Cancel ticket (with confirmation)
  - 🚌 Book another ticket
- **Cancellation System**:
  - Cancel tickets with one click
  - Confirmation dialog
  - Real-time status update
  - Auto-redirect after cancellation

### 🎨 UI/UX Features

- 📱 Fully responsive design (mobile, tablet, desktop)
- ✨ Smooth animations and transitions
- 🎭 Loading spinners and progress indicators
- 🔔 Success/error notifications
- 🎯 Icon-based visual feedback (📍🚗💺👤📱🚏🏁📝🎫✓🔒✖)
- 🖨️ Print-friendly ticket layout
- 🎨 Modern gradient buttons and cards
- ⚡ Instant validation feedback

### 🔧 Technical Features

- **Angular 17+** with standalone components
- **Reactive Forms** with custom validators
- **RxJS** for async operations and parallel requests
- **TypeScript** with strict type checking
- **Proxy Configuration** for backend API
- **Component-based architecture** for reusability
- **Error handling** at every level
- **Production-ready** code (cleaned and optimized)

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18.0.0 or higher
- **npm** v9.0.0 or higher  
- **Angular CLI** v17.0.0 or higher
- **ASP.NET Core Backend** running on https://localhost:44397

### Installation

```bash
# 1. Navigate to the project directory
cd d:\BusTicketReservation\Frontend\bus-ticket-reservation

# 2. Install dependencies
npm install

# 3. Fix PowerShell execution policy (Windows only, if needed)
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned

# 4. Start the development server
ng serve

# 5. Open browser
# Navigate to http://localhost:4200
```

### Backend Setup

Ensure your ASP.NET Core backend is running:
```bash
cd d:\BusTicketReservation\Backend
dotnet run
```

Backend should be accessible at: `https://localhost:44397`

---

## 📁 Project Structure

```
bus-ticket-reservation/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── bus-search/              # Home page - search buses
│   │   │   ├── seat-selection/          # Seat selection and booking
│   │   │   ├── seat-map/                # Reusable seat layout component
│   │   │   └── booking-success/         # Ticket confirmation and management
│   │   ├── services/
│   │   │   └── bus.service.ts           # API communication service
│   │   ├── models/
│   │   │   └── bus.model.ts             # TypeScript interfaces
│   │   ├── app-routing.module.ts        # Application routes
│   │   ├── app.module.ts                # Root module
│   │   └── app.component.ts             # Root component
│   ├── environments/
│   │   ├── environment.ts               # Development config
│   │   └── environment.prod.ts          # Production config
│   ├── assets/                          # Static files
│   ├── index.html                       # Main HTML file
│   ├── main.ts                          # Application bootstrap
│   └── styles.css                       # Global styles
├── proxy.conf.json                      # API proxy configuration
├── angular.json                         # Angular CLI configuration
├── package.json                         # Dependencies
├── tsconfig.json                        # TypeScript configuration
├── README.md                            # This file
├── SETUP_INSTRUCTIONS.md                # Detailed setup guide
├── CODE_REVIEW_REPORT.md                # Code quality report
└── UI_FLOW_GUIDE.md                     # User interface flow
```

---

## 🛣️ Application Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | BusSearchComponent | Home page - Search for buses |
| `/seats/:id` | SeatSelectionComponent | Select and book seats |
| `/booking-success` | BookingSuccessComponent | View booked tickets (state-based) |
| `/booking-success/:id` | BookingSuccessComponent | View single ticket (URL-based) |

---

## 📚 Documentation

For detailed information, refer to these documents:

- **[SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md)** - Complete setup guide with troubleshooting
- **[CODE_REVIEW_REPORT.md](CODE_REVIEW_REPORT.md)** - Code quality and optimization report  
- **[UI_FLOW_GUIDE.md](UI_FLOW_GUIDE.md)** - User interface flow and screenshots

---

## 🖥️ Screenshots

### Bus Search Page
```
┌─────────────────────────────────────────────┐
│  🚌 Bus Ticket Reservation                  │
│  Find and book your bus tickets easily      │
│                                              │
│  From City: [Dhaka ▼]   To: [Chittagong ▼] │
│  Date: [2025-10-28]      [Search Buses]     │
│                                              │
│  Available Buses (3 found)                  │
│  ┌────────────────────────────────────┐    │
│  │ Green Line Express        ৳500      │    │
│  │ AC Coach                            │    │
│  │ 🕐 6:00 AM → 2:00 PM               │    │
│  │ 💺 25 seats left   [View Seats]    │    │
│  └────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
```

### Seat Selection Page
```
┌─────────────────────────────────────────────┐
│  🚗 Driver                                   │
│                                              │
│   A1  A2  │  A3  A4                         │
│   💺  💺  │  💺  💺  ← Available            │
│                                              │
│   B1  B2  │  B3  B4                         │
│   ✓   💺  │  🔒  ✖   ← Selected/Booked     │
│                                              │
│  Selected Seats: A1, B1                     │
│  Total: ৳1000                                │
│                                              │
│  📝 Passenger Details                       │
│  Name: [________________]                   │
│  Mobile: [________________]                 │
│  Boarding: [Mohakhali ▼]                   │
│  Dropping: [Agrabad ▼]                     │
│  [Confirm Booking]                          │
└─────────────────────────────────────────────┘
```

---

## 🧪 Testing

### Manual Testing Checklist

- [x] Search buses with valid inputs
- [x] Search with same departure/destination (validation)
- [x] Search with past date (validation)
- [x] Select single seat
- [x] Select multiple seats
- [x] Book ticket with valid details
- [x] Book ticket with invalid details (validation)
- [x] View ticket confirmation
- [x] Cancel ticket
- [x] Print ticket

### Running Tests

```bash
# Unit tests (if configured)
ng test

# E2E tests (if configured)
ng e2e

# Code linting
ng lint
```

---

## 🏗️ Building for Production

```bash
# Build for production
ng build --configuration production

# Output will be in dist/bus-ticket-reservation/
# Deploy the contents to your web server
```

### Build Output
- Optimized and minified JavaScript
- Compiled CSS
- AOT (Ahead-of-Time) compilation
- Tree-shaking enabled
- Source maps disabled (configurable)

---

## ⚙️ Configuration

### Environment Variables

**Development (`src/environments/environment.ts`):**
```typescript
export const environment = {
  production: false,
  apiBaseUrl: '/api'
};
```

**Production (`src/environments/environment.prod.ts`):**
```typescript
export const environment = {
  production: true,
  apiBaseUrl: 'https://your-api-domain.com/api'
};
```

### Proxy Configuration

All `/api/*` requests are proxied to the backend server:

```json
{
  "/api": {
    "target": "https://localhost:44397",
    "secure": false,
    "changeOrigin": true
  }
}
```

---

## 🔧 Development

### Available Commands

```bash
# Start development server
ng serve

# Start with proxy
ng serve --proxy-config proxy.conf.json

# Start on different port
ng serve --port 4201

# Build for production
ng build --prod

# Generate component
ng generate component component-name

# Generate service
ng generate service service-name

# Run linter
ng lint

# Clear cache
ng cache clean
```

### Code Style

- **TypeScript** with strict mode enabled
- **ESLint** for code quality
- **Prettier** for code formatting (optional)
- Component-based architecture
- Reactive programming with RxJS

---

## 🐛 Troubleshooting

### Common Issues

**1. PowerShell Execution Policy Error (Windows)**
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

**2. Cannot Connect to Backend**
- Verify backend is running on https://localhost:44397
- Check proxy.conf.json configuration
- Ensure CORS is enabled on backend

**3. Port 4200 Already in Use**
```bash
ng serve --port 4201
```

**4. Module Not Found Errors**
```bash
rm -rf node_modules package-lock.json
npm install
```

For more troubleshooting, see [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md#troubleshooting)

---

## 📊 Code Quality

| Metric | Status |
|--------|--------|
| TypeScript Coverage | 100% |
| Console.logs (Debug) | Removed ✅ |
| Unused Code | Removed ✅ |
| Code Duplication | None ✅ |
| Compilation Errors | 0 ✅ |
| Linting Errors | 0 ✅ |

See [CODE_REVIEW_REPORT.md](CODE_REVIEW_REPORT.md) for detailed quality report.

---

## 🚀 Future Enhancements

- [ ] User authentication and authorization
- [ ] Payment gateway integration
- [ ] Email/SMS notifications
- [ ] Booking history page
- [ ] User profile management
- [ ] Admin dashboard
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Seat preference (window/aisle)
- [ ] Discount codes and offers
- [ ] Bus ratings and reviews

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Authors

- **Your Name** - *Initial work* - [GitHub Profile](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- Angular team for the amazing framework
- ASP.NET Core team for the backend framework
- Community contributors and testers

---

## 📞 Support

For support, questions, or issues:
- Create an issue in the repository
- Contact: your.email@example.com
- Documentation: [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md)

---

<div align="center">

**Built with ❤️ using Angular**

[⬆ Back to Top](#bus-ticket-reservation-system-)

</div>
```bash
cd Frontend/bus-ticket-reservation
```

2. Install dependencies:
```bash
npm install
```

3. Update API URL (if needed):
   - Open `src/app/services/bus.service.ts`
   - Update the `apiUrl` variable:
```typescript
private apiUrl = 'http://localhost:5000/api'; // Change port if needed
```

### Running the Application

1. Start the development server:
```bash
npm start
```
or
```bash
ng serve
```

2. Open your browser and navigate to:
```
http://localhost:4200
```

3. The application will automatically reload when you make changes to the source files.

## ?? Project Structure

```
Frontend/bus-ticket-reservation/
??? src/
?   ??? app/
?   ?   ??? components/
?   ?   ?   ??? bus-search/               # Bus search page
?   ?   ?   ?   ??? bus-search.component.ts
?   ?   ?   ?   ??? bus-search.component.html
?   ?   ?   ?   ??? bus-search.component.css
?   ?   ?   ??? seat-selection/           # Seat selection page
?   ?   ?   ?   ??? seat-selection.component.ts
?   ?   ?   ?   ??? seat-selection.component.html
?   ?   ?   ?   ??? seat-selection.component.css
?   ?   ?   ??? booking-success/          # Booking confirmation page
?   ?   ?       ??? booking-success.component.ts
?   ?   ?       ??? booking-success.component.html
?   ?   ?       ??? booking-success.component.css
?   ?   ??? models/
?   ?   ?   ??? bus.model.ts              # TypeScript interfaces
?   ?   ??? services/
?   ?   ?   ??? bus.service.ts            # API service
?   ?   ??? app-routing.module.ts         # Route configuration
?   ?   ??? app.module.ts                 # Main module
?   ?   ??? app.component.ts              # Root component
?   ??? styles.css                        # Global styles
?   ??? index.html                        # Main HTML file
?   ??? main.ts                           # Application entry point
??? angular.json                          # Angular configuration
??? package.json                          # Dependencies
??? tsconfig.json                         # TypeScript configuration
```

## ?? UI/UX Features

### Design Highlights

- **Modern Gradient Background**: Beautiful purple gradient theme
- **Card-based Layout**: Clean, organized information display
- **Smooth Animations**: Fade-in, scale, and slide animations
- **Hover Effects**: Interactive buttons and cards
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Loading States**: Spinners and loading messages
- **Error Handling**: User-friendly error messages
- **Success Feedback**: Celebration animation on successful booking

### Color Scheme

- Primary: Blue (#3498db)
- Success: Green (#2ecc71)
- Warning: Yellow (#f1c40f)
- Danger: Red (#e74c3c)
- Background: Purple gradient (#667eea to #764ba2)

## ?? User Flow

1. **Search Page** (`/`)
   - User enters From, To, and Journey Date
   - Clicks "Search Buses"
   - Views available buses with details
   - Clicks "View Seats & Book" on desired bus

2. **Seat Selection** (`/seats/:id`)
   - Views bus schedule details
   - Sees seat layout with availability
   - Selects an available seat
   - Enters passenger details
   - Confirms booking

3. **Booking Success** (`/booking-success/:id`)
   - Views booking confirmation
   - See complete ticket details
   - Can print ticket
   - Can book another ticket

## ?? Configuration

### API Endpoints Used

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/Bus/Availablebus` | GET | Search available buses |
| `/api/Booking/schedule/{id}` | GET | Get bus schedule details with seats |
| `/api/Booking/book` | POST | Book a ticket |
| `/api/Booking/{id}` | GET | Get ticket details |

### CORS Configuration

Ensure your backend API allows CORS from `http://localhost:4200`:

```csharp
// In Program.cs or Startup.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

app.UseCors("AllowAngular");
```

## ?? Testing the Application

### Manual Testing Steps

1. **Search Functionality**
   - Select different cities
   - Try different dates
   - Verify results display correctly

2. **Seat Selection**
   - Click on available seats (green)
   - Try clicking booked/sold seats (should not select)
   - Verify selected seat highlights in blue

3. **Booking Form**
   - Leave fields empty and submit (should show validation errors)
   - Enter invalid phone number (should show error)
   - Fill all fields correctly and submit

4. **Booking Confirmation**
   - Verify all ticket details are correct
   - Test print functionality
   - Test "Book Another Ticket" button

## ?? Responsive Breakpoints

- **Desktop**: > 1024px (Full layout)
- **Tablet**: 768px - 1024px (Adjusted grid)
- **Mobile**: < 768px (Stacked layout)

## ?? Key Components Explained

### BusSearchComponent
- Handles bus search form
- Displays search results
- Navigates to seat selection

### SeatSelectionComponent
- Displays seat layout in grid format
- Handles seat selection logic
- Manages booking form
- Submits booking request

### BookingSuccessComponent
- Shows booking confirmation
- Displays e-ticket
- Provides print functionality

### BusService
- Communicates with backend API
- Handles HTTP requests
- Returns Observables for async operations

## ?? Troubleshooting

### Common Issues

**Issue**: CORS error when calling API
- **Solution**: Add CORS policy in backend (see Configuration section)

**Issue**: "Cannot GET /seats/..." on page refresh
- **Solution**: Configure server to redirect all routes to index.html

**Issue**: Seats not displaying correctly
- **Solution**: Check API response format matches the model interfaces

**Issue**: Date picker not working
- **Solution**: Ensure browser supports HTML5 date input

## ?? Building for Production

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## ?? Deployment Options

### Option 1: Deploy to Netlify/Vercel
1. Build the project: `ng build --configuration production`
2. Deploy the `dist/bus-ticket-reservation` folder

### Option 2: Deploy with Backend
1. Build the project
2. Copy `dist/bus-ticket-reservation` contents to backend's `wwwroot` folder
3. Configure backend to serve static files

### Option 3: Deploy to Azure/AWS
1. Build the project
2. Upload to Azure Static Web Apps or AWS S3
3. Configure routing rules

## ?? Customization

### Changing Colors

Edit `src/styles.css` and component CSS files to change color scheme:

```css
/* Primary color */
background: linear-gradient(135deg, #YOUR_COLOR_1, #YOUR_COLOR_2);

/* Button colors */
.btn-primary {
  background: linear-gradient(135deg, #YOUR_COLOR_1, #YOUR_COLOR_2);
}
```

### Changing API URL

Edit `src/app/services/bus.service.ts`:

```typescript
private apiUrl = 'https://your-api-url.com/api';
```

## ?? License

This project is part of the Bus Ticket Reservation System.

## ?? Support

For issues or questions:
1. Check the API documentation in `API_DOCUMENTATION.md`
2. Verify backend API is running
3. Check browser console for errors
4. Review network tab in developer tools

## ? Future Enhancements

- [ ] Add user authentication
- [ ] Payment gateway integration
- [ ] Booking history
- [ ] Email confirmation
- [ ] SMS notifications
- [ ] Seat selection for multiple passengers
- [ ] Favorite routes
- [ ] Price filters
- [ ] Bus company filters
- [ ] Multi-language support

---

**Enjoy booking bus tickets! ???**
