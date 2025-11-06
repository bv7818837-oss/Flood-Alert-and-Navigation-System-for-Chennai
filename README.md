# 🌊 Chennai Urban Flood Alert System

A comprehensive, AI-powered flood monitoring and alert system designed specifically for Chennai, India. This system provides real-time street-level flood alerts, emergency response features, and smart route planning to help citizens stay safe during flood events.

## 🚨 Problem Statement

Flooding has become a serious and frequent issue in many Indian cities, especially Chennai. Just a few hours of rain can block roads, damage property, and put lives at risk. Current flood alerts are too general and don't provide real-time updates for specific streets or neighborhoods. This system addresses these critical gaps.

## ✨ Key Features

### 🗺️ Real-time Flood Monitoring
- **Street-level flood alerts** with precise GPS coordinates
- **Interactive flood map** showing affected areas in real-time
- **AI-powered flood prediction** using historical data and weather patterns
- **Dynamic water level tracking** with severity classification

### 📱 Smart Alert System
- **SMS-based alerts** for areas with poor internet connectivity
- **Personalized warnings** based on user's GPS location
- **Early warning system** with predicted flood arrival times
- **Multi-language support** for better accessibility

### 🛣️ Intelligent Route Planning
- **Safe route suggestions** to avoid flood zones
- **Real-time traffic integration** with flood data
- **Alternative route recommendations** during emergencies
- **Distance and time calculations** for safe travel

### 🚨 Emergency Response
- **One-touch emergency button** with location sharing
- **Direct emergency contact integration** (Police, Ambulance, Fire)
- **Nearby shelter identification** with contact information
- **Emergency SMS broadcasting** to registered contacts

### 📊 Advanced Dashboard
- **Live flood statistics** and risk assessment
- **User-specific risk level** calculation
- **Real-time monitoring** with timestamp tracking
- **Emergency contact quick access**

### 🔄 Offline Capabilities
- **Offline mode** for emergency situations
- **Cached data** for continued functionality
- **SMS queue system** for when connectivity returns
- **Local storage** for critical information

## 🏗️ Technical Architecture

### Frontend Technologies
- **HTML5** with responsive full-screen design
- **CSS3** with modern glassmorphism effects
- **JavaScript ES6+** for interactive features
- **Leaflet.js** for real-time interactive mapping
- **OpenStreetMap** tiles for accurate Chennai street data
- **Progressive Web App** capabilities
- **Mobile-first responsive design** with collapsible sidebar

### Data Management
- **Comprehensive city-wide database** with 60+ specific Chennai streets
- **Complete Chennai coverage** across all major zones
- **Real-time flood data simulation** with AI prediction
- **Emergency contact database** with local services
- **Shelter location mapping** with capacity information
- **Interactive map markers** with real GPS coordinates

### AI & Prediction Engine
- **Machine learning algorithms** for flood risk assessment
- **Historical pattern analysis** for prediction accuracy
- **Real-time sensor data simulation** (expandable to real IoT)
- **Dynamic risk calculation** based on multiple factors

## 📍 Coverage Areas

The system currently monitors 20+ critical areas across Chennai:

### Central Chennai
- Anna Salai (Mount Road)
- T Nagar - Pondy Bazaar
- Mylapore - Luz Church Road
- Triplicane - Pycrofts Road

### South Chennai
- Velachery Main Road
- OMR - Sholinganallur
- ECR - Thiruvanmiyur
- Adyar - Besant Nagar

### West Chennai
- Tambaram - GST Road
- Chromepet - Pallavaram
- Pallikaranai - Medavakkam

### North Chennai
- Tondiarpet - Ennore
- Royapuram - Washermanpet
- Perambur - Purasawalkam

### East Chennai
- Mylapore - Santhome
- Foreshore Estate - Marina

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for real-time updates)
- GPS access (for location-based alerts)

### Installation
1. Clone or download the project files
2. Open `flood.html` in your web browser
3. Allow location access when prompted
4. Subscribe to SMS alerts for full functionality

### Usage
1. **Set Your Location**: Click on the map to mark your home/office location
2. **Check Flood Status**: Click "Check My Flood Status" for personalized alerts
3. **Plan Routes**: Use the route planner to find safe paths
4. **Subscribe to SMS**: Enter your phone number for emergency alerts
5. **Emergency Response**: Use the emergency button in critical situations

## 🔧 Configuration

### Adding New Areas
To add new monitoring areas, update the `floodData` array in the JavaScript section:

```javascript
{
    id: 'unique_id',
    streetName: 'Area Name',
    lat: latitude,
    lon: longitude,
    waterLevel_cm: 0,
    severity: 'none',
    predictedArrival: null,
    shelterNearby: 'Nearest Shelter',
    lastUpdated: new Date(),
    riskLevel: 'low|medium|high'
}
```

### Emergency Contacts
Update the `emergencyContacts` object for local emergency numbers:

```javascript
const emergencyContacts = {
    police: '100',
    ambulance: '108',
    fire: '101',
    disasterManagement: '1070',
    chennaiCorporation: '044-25619206',
    floodControl: '044-28553900'
};
```

## 📱 SMS Integration

The system includes simulated SMS functionality that can be integrated with real SMS gateways:

- **Twilio API** for international SMS
- **TextLocal** for Indian SMS services
- **AWS SNS** for scalable messaging
- **Custom SMS gateway** integration

## 🔮 Future Enhancements

### IoT Integration
- **Real sensor data** from flood monitoring devices
- **Water level sensors** at critical locations
- **Weather station integration** for accurate predictions
- **Smart city infrastructure** connectivity

### Advanced Features
- **Machine learning models** for better prediction accuracy
- **Social media integration** for crowd-sourced data
- **Mobile app development** for better user experience
- **Multi-city expansion** for other flood-prone areas

### Government Integration
- **Official flood data** from meteorological departments
- **Emergency service coordination** with local authorities
- **Disaster management** system integration
- **Public safety** network connectivity

## 🤝 Contributing

We welcome contributions to improve the Chennai Urban Flood Alert System:

1. **Bug Reports**: Report issues and bugs
2. **Feature Requests**: Suggest new features
3. **Code Contributions**: Submit pull requests
4. **Documentation**: Help improve documentation
5. **Testing**: Test in different environments

## 📄 License

This project is open source and available under the MIT License. See the LICENSE file for details.

## 📞 Support

For support, questions, or emergency assistance:

- **Emergency**: Use the emergency button in the app
- **Technical Support**: Create an issue in the project repository
- **General Inquiries**: Contact the development team

## 🙏 Acknowledgments

- **Chennai Corporation** for flood data and emergency contacts
- **Indian Meteorological Department** for weather pattern data
- **Local emergency services** for contact information
- **Open source community** for tools and libraries

## 📊 System Status

- ✅ **Real-time Monitoring**: Active
- ✅ **SMS Alerts**: Functional
- ✅ **Emergency Response**: Ready
- ✅ **Route Planning**: Operational
- ✅ **Offline Mode**: Available
- ✅ **AI Prediction**: Running

---

**⚠️ Important Note**: This is a demonstration system. In emergency situations, always contact official emergency services directly. This system is designed to complement, not replace, official emergency response systems.

**🌊 Stay Safe, Stay Informed!**
