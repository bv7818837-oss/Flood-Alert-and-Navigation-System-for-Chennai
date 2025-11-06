import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
from datetime import datetime, timedelta
import os

# Set style for better looking plots
plt.style.use('ggplot')
sns.set_theme(style="whitegrid")

# Create output directory if it doesn't exist
output_dir = 'metrics_charts'
os.makedirs(output_dir, exist_ok=True)

def generate_response_time_chart():
    """Generate response time line chart"""
    # Generate sample response time data (in milliseconds)
    dates = [datetime.now() - timedelta(days=i) for i in range(7)]
    response_times = [120 + np.random.normal(0, 15) for _ in range(7)]
    
    plt.figure(figsize=(10, 5))
    plt.plot(dates, response_times, marker='o', linewidth=2)
    plt.title('API Response Time Over Time', fontsize=14, pad=20)
    plt.xlabel('Date', fontsize=12)
    plt.ylabel('Response Time (ms)', fontsize=12)
    plt.xticks(rotation=45)
    plt.grid(True, linestyle='--', alpha=0.7)
    plt.tight_layout()
    
    # Save the figure
    output_path = os.path.join(output_dir, 'response_time.png')
    plt.savefig(output_path, dpi=300, bbox_inches='tight')
    plt.close()
    return output_path

def generate_accuracy_chart():
    """Generate accuracy metrics bar chart"""
    metrics = ['Precision', 'Recall', 'F1-Score', 'Accuracy']
    values = [0.85, 0.88, 0.865, 0.87]  # Example values
    
    plt.figure(figsize=(10, 5))
    bars = plt.bar(metrics, values, color=sns.color_palette("viridis", len(metrics)))
    
    # Add value labels on top of bars
    for bar in bars:
        height = bar.get_height()
        plt.text(bar.get_x() + bar.get_width()/2., height,
                 f'{height:.3f}',
                 ha='center', va='bottom')
    
    plt.title('Model Performance Metrics', fontsize=14, pad=20)
    plt.ylim(0, 1.0)
    plt.grid(axis='y', linestyle='--', alpha=0.7)
    
    output_path = os.path.join(output_dir, 'accuracy_metrics.png')
    plt.savefig(output_path, dpi=300, bbox_inches='tight')
    plt.close()
    return output_path

def generate_confusion_matrix():
    """Generate a confusion matrix"""
    # Example confusion matrix data
    cm = np.array([[85, 15], [10, 90]])  # [TN, FP], [FN, TP]
    labels = ['No Flood', 'Flood']
    
    plt.figure(figsize=(8, 6))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', 
                xticklabels=labels, yticklabels=labels)
    
    plt.title('Confusion Matrix', fontsize=14, pad=20)
    plt.xlabel('Predicted Label')
    plt.ylabel('True Label')
    
    output_path = os.path.join(output_dir, 'confusion_matrix.png')
    plt.savefig(output_path, dpi=300, bbox_inches='tight')
    plt.close()
    return output_path

def generate_uptime_chart():
    """Generate system uptime pie chart"""
    labels = ['Uptime', 'Downtime']
    sizes = [98.5, 1.5]  # 98.5% uptime
    colors = ['#66b3ff', '#ff9999']
    
    plt.figure(figsize=(8, 8))
    plt.pie(sizes, labels=labels, colors=colors, autopct='%1.1f%%', 
            startangle=90, shadow=True, explode=(0.1, 0))
    plt.axis('equal')  # Equal aspect ratio ensures that pie is drawn as a circle
    plt.title('System Uptime (Last 30 Days)', fontsize=14, pad=20)
    
    output_path = os.path.join(output_dir, 'uptime.png')
    plt.savefig(output_path, dpi=300, bbox_inches='tight')
    plt.close()
    return output_path

if __name__ == "__main__":
    print("Generating charts for your conference paper...")
    
    # Generate all charts
    charts = {
        "Response Time": generate_response_time_chart(),
        "Accuracy Metrics": generate_accuracy_chart(),
        "Confusion Matrix": generate_confusion_matrix(),
        "System Uptime": generate_uptime_chart()
    }
    
    # Create a README file with chart descriptions
    with open(os.path.join(output_dir, 'README.md'), 'w') as f:
        f.write("# Metrics Visualization\n\n")
        f.write("This directory contains visualizations for the flood monitoring system's performance metrics.\n\n")
        f.write("## Charts Description\n")
        for name, path in charts.items():
            f.write(f"- **{name}**: `{os.path.basename(path)}` - {name.replace('_', ' ').title()} visualization.\n")
    
    print(f"\nCharts have been generated and saved in the '{output_dir}' directory:")
    for name, path in charts.items():
        print(f"- {name}: {path}")
    print("\nA README.md file has been created with descriptions of each chart.")
