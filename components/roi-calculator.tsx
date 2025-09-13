"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Calculator, TrendingUp, DollarSign, Target } from "lucide-react"

export function ROICalculator() {
  const [adSpend, setAdSpend] = useState([5000])
  const [leads, setLeads] = useState([100])
  const [conversionRate, setConversionRate] = useState([2.5])
  const [averageOrderValue, setAverageOrderValue] = useState([250])

  const costPerLead = adSpend[0] / leads[0]
  const conversions = leads[0] * (conversionRate[0] / 100)
  const revenue = conversions * averageOrderValue[0]
  const roi = ((revenue - adSpend[0]) / adSpend[0]) * 100
  const roas = revenue / adSpend[0]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const getROIColor = (roi: number) => {
    if (roi >= 200) return "text-green-600 bg-green-50"
    if (roi >= 100) return "text-blue-600 bg-blue-50"
    if (roi >= 0) return "text-yellow-600 bg-yellow-50"
    return "text-red-600 bg-red-50"
  }

  return (
    <div className="space-y-6">
      {/* Calculator Header */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-montserrat font-bold flex items-center">
            <Calculator className="w-5 h-5 mr-2" />
            ROI Calculator
          </CardTitle>
          <CardDescription>
            Calculate return on investment and cost per lead for your marketing campaigns.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Controls */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Campaign Parameters</CardTitle>
            <CardDescription>Adjust the sliders to see real-time ROI calculations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Ad Spend */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Monthly Ad Spend</Label>
                <Badge variant="outline">{formatCurrency(adSpend[0])}</Badge>
              </div>
              <Slider value={adSpend} onValueChange={setAdSpend} max={50000} min={500} step={500} className="w-full" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$500</span>
                <span>$50,000</span>
              </div>
            </div>

            {/* Leads */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Monthly Leads</Label>
                <Badge variant="outline">{leads[0]} leads</Badge>
              </div>
              <Slider value={leads} onValueChange={setLeads} max={1000} min={10} step={10} className="w-full" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>10</span>
                <span>1,000</span>
              </div>
            </div>

            {/* Conversion Rate */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Conversion Rate</Label>
                <Badge variant="outline">{conversionRate[0]}%</Badge>
              </div>
              <Slider
                value={conversionRate}
                onValueChange={setConversionRate}
                max={20}
                min={0.5}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0.5%</span>
                <span>20%</span>
              </div>
            </div>

            {/* Average Order Value */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Average Order Value</Label>
                <Badge variant="outline">{formatCurrency(averageOrderValue[0])}</Badge>
              </div>
              <Slider
                value={averageOrderValue}
                onValueChange={setAverageOrderValue}
                max={2000}
                min={50}
                step={25}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$50</span>
                <span>$2,000</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Calculated Results</CardTitle>
            <CardDescription>Real-time ROI and performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">Cost per Lead</span>
                </div>
                <p className="text-2xl font-bold">{formatCurrency(costPerLead)}</p>
              </div>

              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">Conversions</span>
                </div>
                <p className="text-2xl font-bold">{Math.round(conversions)}</p>
              </div>

              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium">Revenue</span>
                </div>
                <p className="text-2xl font-bold">{formatCurrency(revenue)}</p>
              </div>

              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Calculator className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium">ROAS</span>
                </div>
                <p className="text-2xl font-bold">{roas.toFixed(2)}x</p>
              </div>
            </div>

            {/* ROI Display */}
            <div className="p-6 border-2 border-dashed border-primary/20 rounded-lg text-center">
              <h3 className="text-lg font-semibold mb-2">Return on Investment</h3>
              <div className={`inline-flex items-center px-4 py-2 rounded-full ${getROIColor(roi)}`}>
                <TrendingUp className="w-5 h-5 mr-2" />
                <span className="text-2xl font-bold">{roi.toFixed(1)}%</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {roi >= 200
                  ? "Excellent ROI! Your campaigns are highly profitable."
                  : roi >= 100
                    ? "Good ROI. Consider optimizing for even better results."
                    : roi >= 0
                      ? "Positive ROI. Room for improvement in conversion optimization."
                      : "Negative ROI. Review and optimize your campaign strategy."}
              </p>
            </div>

            {/* Recommendations */}
            <div className="space-y-3">
              <h4 className="font-semibold">Optimization Recommendations:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {costPerLead > 100 && <li>• Consider reducing cost per lead through better targeting</li>}
                {conversionRate[0] < 3 && <li>• Improve landing page conversion rate with A/B testing</li>}
                {roi < 100 && <li>• Focus on higher-value customers to improve ROI</li>}
                {roas < 3 && <li>• Optimize ad creative and targeting for better ROAS</li>}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
