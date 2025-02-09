"use client"

import { useState, useRef } from "react" // Added useRef import
import { motion, AnimatePresence, color } from "framer-motion"
import { Upload, AlertCircle, Loader2, TreesIcon as Lungs, Brain, Heart, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// ... rest of the code remains the same


interface Prediction {
  class: string
  confidence: number
  details?: {
    severity?: string
    recommendations?: string[]
  }
  preview?: string
}

const API_ENDPOINT = "http://localhost:5000/api/predict"

const ORGAN_ICONS = {
  lungs: Lungs,
  brain: Brain,
  heart: Heart,
} as const

export default function ImageClassifier() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>("")
  const [prediction, setPrediction] = useState<Prediction | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const [activeTab, setActiveTab] = useState("upload")
  const fileInputRef = useRef<HTMLInputElement | null>(null)


  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setPreview(URL.createObjectURL(file))
      setPrediction(null)
      setError("")
      setActiveTab("preview")
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!selectedFile) return

    setIsLoading(true)
    setError("")

    const formData = new FormData()
    formData.append("image", selectedFile)

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to process image")
      }

      const data = await response.json()
      setPrediction({
        ...data,
        details: {
          severity: "Moderate",
          recommendations: [
            "Consider follow-up examination",
            "Monitor symptoms regularly",
            "Consult with specialist for detailed analysis",
          ],
        },
      })
      setActiveTab("results")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
            Medical Image Analysis
          </h1>
          <p className="text-white-400 max-w-xl mx-auto">
            Upload your medical scan for instant AI-powered analysis
          </p>
        </div>

        <Card className="bg-zinc-800/50 border-zinc-700 backdrop-blur-sm">
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid grid-cols-3 bg-zinc-900">
                <TabsTrigger value="upload">Upload</TabsTrigger>
                <TabsTrigger value="preview" disabled={!preview}>
                  Preview
                </TabsTrigger>
                <TabsTrigger value="results" disabled={!prediction}>
                  Results
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <input
                      type="file"
                      id="imageInput"
                      ref={fileInputRef}
                      accept="image/png, image/jpeg"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    
                    <Button
                      type="button"
                      onClick={handleUploadClick}
                      variant="outline"
                      className="bg-zinc-900 text-white hover:bg-zinc-800 border-zinc-700"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Select Image File
                    </Button>
                    
                    <p className="text-white-500 text-sm text-white">
                      Supported formats: PNG, JPG, JPEG
                    </p>

                    {selectedFile && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                      >
                        <p className="text-white-300 text-white">
                          Selected file: {selectedFile.name}
                        </p>
                        <Button
                          type="submit"
                          className="mt-4 bg-white text-black hover:bg-zinc-200"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            'Analyze Now'
                          )}
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="preview">
                {preview && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div className="relative aspect-square max-h-[400px] rounded-lg overflow-hidden border border-zinc-700">
                      <img
                        src={preview}
                        alt="Scan preview"
                        className="h-full w-full object-contain bg-black"
                      />
                    </div>
                    <div className="flex justify-center gap-4">
                      <Button
                        onClick={() => setActiveTab("upload")}
                        variant="outline"
                        className="border-zinc-700 hover:bg-zinc-800"
                      >
                        Re-upload Image
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        className="bg-white text-black hover:bg-zinc-200"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          'Start Analysis'
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </TabsContent>

              <TabsContent value="results">
                {prediction && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="bg-zinc-900/50 border-zinc-700">
                        <CardContent className="p-6 space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/10 rounded-lg">
                              <Activity className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-semibold text-white">Analysis Results</h3>
                          </div>
                          <div className="space-y-2">
                            <p>
                              <span className="text-white-400 text-white">Classification:</span>{' '}
                              <span className="font-medium text-white">{prediction.class}</span>
                            </p>
                            <p>
                              <span className="text-white-400 text-white">Confidence:</span>{' '}
                              <span className="font-medium text-white">{prediction.confidence.toFixed(1)}%</span>
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-zinc-900/50 border-zinc-700">
                        <CardContent className="p-6 space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/10 rounded-lg">
                              <Brain className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-semibold text-white">Recommendations</h3>
                          </div>
                          <ul className="space-y-2">
                            {prediction.details?.recommendations?.map((rec, index) => (
                              <li key={index} className="flex items-start gap-2 text-white">
                                <span className="text-white-400 text-white">•</span>
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="flex justify-center gap-4">
                      <Button
                        onClick={() => {
                          setSelectedFile(null)
                          setPreview("")
                          setPrediction(null)
                          setActiveTab("upload")
                        }}
                        variant="outline"
                        className="border-zinc-700 hover:bg-zinc-800"
                      >
                        Analyze Another Scan
                      </Button>
                    </div>
                  </motion.div>
                )}
              </TabsContent>
            </Tabs>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6"
                >
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-white-500">
          <p>This is a demo application. For actual medical diagnosis, please consult healthcare professionals.</p>
        </div>
      </motion.div>
    </div>
  )
}
