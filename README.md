# 🚦 Smart Traffic Signal Simulation with AWS Integration

A comprehensive intelligent traffic management system featuring AI-based signal control, real-time vehicle behavior simulation, and cloud-based analytics using Amazon DynamoDB.

## 🌟 Key Features

### 🧠 AI-Powered Traffic Control
- **Smart Signal Switching**: AI analyzes traffic density and selects optimal green light timing
- **85% Clearance Rule**: Ensures efficient queue clearing with dynamic duration calculation
- **Congestion Analysis**: 5-level traffic classification (Light, Moderate, Heavy, Critical)
- **Learning Algorithm**: Adapts based on historical performance data
- **Priority Scoring**: Balances efficiency and fairness across all directions

### ☁️ AWS Cloud Integration
- **Amazon DynamoDB Logging**: Real-time traffic cycle data storage
- **Asynchronous Processing**: Non-blocking cloud logging to maintain simulation performance
- **Comprehensive Analytics**: Detailed performance metrics and AI decision tracking
- **Scalable Architecture**: Pay-per-request DynamoDB billing for cost efficiency

### 🚗 Enhanced Vehicle Simulation
- **Realistic Movement**: Smooth acceleration/deceleration with collision detection
- **Multiple Vehicle Types**: Cars, buses, bikes, trucks with distinct characteristics
- **Lane Management**: Two-lane bidirectional traffic in all directions
- **Safe Following Distance**: Vehicle-specific spacing based on type and speed
- **Intersection Safety**: Vehicles stop behind stop lines, never in intersection

### 🎨 Advanced Visual Interface
- **Professional Graphics**: Detailed road infrastructure with lane markings
- **Real-time UI**: Live countdown timers, vehicle counts, and performance metrics
- **Traffic Light Animation**: Realistic signal displays with glowing effects
- **Zebra Crossings**: Detailed crosswalk patterns and stop lines
- **Performance Dashboard**: Efficiency tracking and cycle statistics

## 🚀 Quick Start

### 1. Initial Setup
```bash
# Run the setup script to configure AWS and install dependencies
python setup_aws_simulation.py
```

### 2. Launch Simulation
```bash
# Use the interactive launcher (recommended)
python run_smart_simulation.py

# Or run directly
python smart_traffic_simulation.py
```

### 3. AWS Configuration
The setup script will guide you through:
- Installing required dependencies (OpenCV, NumPy, Boto3)
- Configuring AWS credentials
- Testing DynamoDB connection
- Creating sample configuration files

## 📋 System Requirements

### Software Requirements
- **Python**: 3.9 or higher
- **Operating System**: Windows, macOS, or Linux
- **Display**: 1400x900 resolution recommended
- **Memory**: 1GB RAM minimum

### AWS Requirements
- **AWS Account** with DynamoDB access
- **IAM User** with DynamoDB permissions:
  - `dynamodb:CreateTable`
  - `dynamodb:PutItem`
  - `dynamodb:BatchWriteItem`
  - `dynamodb:Scan`
  - `dynamodb:Query`

### Python Dependencies
```
opencv-python>=4.5.0
numpy>=1.21.0
boto3>=1.26.0
```

## 🔧 Configuration

### Simulation Settings
Edit `simulation_config.json` to customize:

```json
{
  "simulation": {
    "duration": 300,
    "width": 1400,
    "height": 900,
    "spawn_probability": 0.15
  },
  "aws": {
    "table_name": "smart-traffic-logs",
    "region": "us-east-1"
  },
  "ai": {
    "min_green_time": 15,
    "max_green_time": 45,
    "congestion_thresholds": {
      "light": 5,
      "moderate": 12,
      "heavy": 20,
      "critical": 30
    }
  }
}
```

### AWS Credentials
Credentials are stored in `~/.aws/credentials`:
```ini
[default]
aws_access_key_id = YOUR_ACCESS_KEY
aws_secret_access_key = YOUR_SECRET_KEY
```

## 📊 Data Analytics

### DynamoDB Schema
Each traffic cycle logs comprehensive data:

```json
{
  "simulation_id": "smart_sim_1234567890",
  "timestamp": "2025-06-26T12:00:00.000Z",
  "cycle_number": 15,
  "green_direction": "north",
  "green_duration": 25,
  "vehicle_counts": {
    "north": 18,
    "east": 7,
    "south": 12,
    "west": 4
  },
  "efficiency_metrics": {
    "vehicles_spawned": 250,
    "vehicles_cleared": 213,
    "clearance_rate": 0.852,
    "current_queue_size": 37
  },
  "ai_analysis": {
    "traffic_analysis": {
      "north": {
        "count": 18,
        "level": "heavy",
        "priority": 0.8,
        "urgency_score": 1.2
      }
    },
    "decision_factors": {
      "total_vehicles": 41,
      "max_congestion_level": "heavy",
      "urgency_scores": {...},
      "historical_performance": {...}
    }
  }
}
```

### Performance Metrics
- **Clearance Rate**: Percentage of vehicles successfully processed
- **Cycle Efficiency**: Average vehicles cleared per green light cycle
- **Wait Time Analysis**: Historical performance by direction
- **Congestion Patterns**: Peak traffic identification
- **AI Decision Accuracy**: Learning algorithm performance

## 🎮 Controls & Interface

### Keyboard Controls
- **'q'**: Quit simulation early
- **ESC**: Alternative quit method

### Real-time Display
- **Elapsed Time**: Current simulation progress
- **Vehicle Counts**: Live count by direction
- **Current Green Light**: Active signal with countdown timer
- **Performance Metrics**: Efficiency rates and statistics
- **Cycle Information**: Total cycles completed

### Traffic Light States
- **🔴 Red**: Stop - vehicles queue behind stop line
- **🟡 Yellow**: Caution - gradual stopping for safety
- **🟢 Green**: Go - vehicles proceed through intersection

## 🧠 AI Algorithm Details

### Traffic Analysis Engine
1. **Density Classification**: Categorizes traffic levels using configurable thresholds
2. **Urgency Scoring**: Multi-factor analysis including:
   - Current vehicle count
   - Historical performance
   - Wait time factors
   - Time since last green light

3. **Direction Selection**: Chooses next green light based on:
   - Highest urgency score
   - Fairness algorithm (prevents starvation)
   - Critical congestion handling

4. **Duration Calculation**: Determines green light time using:
   - 85% clearance rule
   - Vehicle-specific processing times
   - Minimum/maximum bounds
   - Traffic level adjustments

### Learning Capabilities
- **Performance Tracking**: Monitors clearance rates by direction
- **Adaptive Timing**: Adjusts based on historical success
- **Pattern Recognition**: Identifies peak traffic periods
- **Optimization**: Continuously improves decision-making

## 📁 File Structure

```
smart-traffic-simulation/
├── smart_traffic_simulation.py      # Main simulation engine
├── smart_traffic_components.py      # Vehicle and AI classes
├── aws_integration.py               # DynamoDB logging module
├── setup_aws_simulation.py          # Setup and configuration script
├── run_smart_simulation.py          # Interactive launcher
├── simulation_config.json           # Configuration file
├── requirements.txt                 # Python dependencies
└── README_SMART_TRAFFIC.md         # This documentation
```

## 🔍 Troubleshooting

### Common Issues

**AWS Connection Failed**
- Verify AWS credentials in `~/.aws/credentials`
- Check IAM permissions for DynamoDB access
- Ensure correct region configuration
- Test with: `python run_smart_simulation.py` → Option 5

**Simulation Performance Issues**
- Reduce spawn probability in config
- Lower resolution if needed
- Close other applications
- Check system resources

**OpenCV Display Problems**
- Update graphics drivers
- Try different display scaling
- Ensure X11 forwarding (Linux/WSL)
- Check OpenCV installation

**Import Errors**
- Run setup script: `python setup_aws_simulation.py`
- Verify all files are present
- Check Python version (3.9+ required)
- Reinstall dependencies

### Performance Optimization

**For Better Frame Rate:**
- Reduce simulation window size
- Lower vehicle spawn rate
- Disable AWS logging temporarily
- Use faster hardware

**For Better AI Performance:**
- Adjust congestion thresholds
- Modify learning rate parameters
- Increase minimum green times
- Fine-tune urgency scoring

## 🎯 Achievement Targets

### Efficiency Goals
- **85% Clearance Rate**: Meet the primary efficiency requirement
- **Zero Gridlock**: Prevent intersection blocking
- **Smooth Animation**: Maintain 30+ FPS performance
- **Fair Distribution**: Balanced green time allocation

### Technical Objectives
- **Real-time Processing**: Sub-second AI decision making
- **Reliable Logging**: 100% AWS data capture
- **Scalable Architecture**: Handle 100+ concurrent vehicles
- **Robust Error Handling**: Graceful failure recovery

## 🔮 Future Enhancements

### Planned Features
- **Emergency Vehicle Priority**: Special handling for emergency services
- **Pedestrian Crossings**: Walking signals and pedestrian behavior
- **Weather Conditions**: Rain/snow effects on traffic flow
- **Rush Hour Simulation**: Time-based traffic pattern variations
- **Multi-Intersection Networks**: Connected intersection systems

### Advanced Analytics
- **Machine Learning**: Deep learning for pattern recognition
- **Predictive Modeling**: Traffic flow forecasting
- **Real-time Optimization**: Dynamic parameter adjustment
- **Comparative Analysis**: A/B testing different algorithms

## 📞 Support

### Getting Help
1. **Check Documentation**: Review this README thoroughly
2. **Run Diagnostics**: Use the launcher's test options
3. **Check Logs**: Review console output for error messages
4. **AWS Console**: Verify DynamoDB table creation and data

### Reporting Issues
When reporting problems, include:
- Python version and operating system
- Complete error messages
- Configuration file contents
- AWS region and credentials status

## 🏆 Success Metrics

The simulation tracks multiple success indicators:

- **Traffic Efficiency**: >85% vehicle clearance rate
- **System Performance**: Consistent 30 FPS animation
- **AI Effectiveness**: Balanced green light distribution
- **Data Integrity**: Complete AWS logging coverage
- **User Experience**: Intuitive interface and controls

## 🎉 Conclusion

This Smart Traffic Signal Simulation represents a comprehensive solution for intelligent traffic management, combining:

- **Advanced AI algorithms** for optimal signal control
- **Cloud-based analytics** for comprehensive data insights
- **Realistic vehicle behavior** with proper safety measures
- **Professional visualization** with detailed infrastructure
- **Scalable architecture** for future enhancements

The system demonstrates how modern AI and cloud technologies can be applied to solve real-world traffic management challenges while providing valuable insights through comprehensive data analytics.

---

**Happy Simulating! 🚦✨**
