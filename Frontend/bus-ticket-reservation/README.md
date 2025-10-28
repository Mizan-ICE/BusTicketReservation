# Bus Ticket Reservation - Angular Frontend

A modern, responsive Angular application for booking bus tickets with real-time seat selection and booking management.

## ?? Features

### ? Implemented Features

1. **Bus Search**
   - Search buses by From City, To City, and Journey Date
   - Display available buses in beautiful card layout
   - Show real-time seat availability
   - Responsive design for all devices

2. **Seat Selection & Visualization**
   - Interactive seat layout with visual grid
   - Color-coded seat status:
     - ?? **Green** - Available seats (clickable)
     - ?? **Blue** - Selected seat (your selection)
     - ?? **Yellow** - Booked seats (not available)
     - ?? **Red** - Sold seats (not available)
   - Real-time seat availability updates
   - Driver position indicator

3. **Booking Form**
   - Passenger name input with validation
   - Mobile number input with phone format validation
   - Boarding point selection (dropdown)
   - Dropping point selection (dropdown)
   - Real-time form validation
   - Booking summary with price calculation

4. **Booking Confirmation**
   - Beautiful success animation
   - Complete ticket details display
   - Print ticket functionality
   - Professional e-ticket layout
   - Option to book another ticket

## ?? Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (`npm install -g @angular/cli`)

### Installation

1. Navigate to the Frontend directory:
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
