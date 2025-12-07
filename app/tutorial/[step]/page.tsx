import { notFound } from 'next/navigation'
import { TUTORIAL_STEPS } from '@/lib/tutorial-store'
import { ProgressBar, Navigation } from '@/components/tutorial'

// Step content components
import Step0Content from './steps/Step0'
import Step1Content from './steps/Step1'
import Step2Content from './steps/Step2'
import Step3Content from './steps/Step3'
import Step4Content from './steps/Step4'
import Step5Content from './steps/Step5'
import Step6Content from './steps/Step6'
import Step7Content from './steps/Step7'
import Step8Content from './steps/Step8'

const stepComponents: Record<string, React.ComponentType> = {
  '0': Step0Content,
  '1': Step1Content,
  '2': Step2Content,
  '3': Step3Content,
  '4': Step4Content,
  '5': Step5Content,
  '6': Step6Content,
  '7': Step7Content,
  '8': Step8Content,
}

interface Props {
  params: Promise<{ step: string }>
}

export async function generateStaticParams() {
  return TUTORIAL_STEPS.map((step) => ({
    step: step.slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { step } = await params
  const stepData = TUTORIAL_STEPS.find((s) => s.slug === step)

  if (!stepData) {
    return { title: 'Not Found' }
  }

  return {
    title: `Step ${stepData.id}: ${stepData.title} | Next.js 完全入門`,
    description: stepData.description,
  }
}

export default async function TutorialStepPage({ params }: Props) {
  const { step } = await params
  const stepData = TUTORIAL_STEPS.find((s) => s.slug === step)

  if (!stepData) {
    notFound()
  }

  const StepContent = stepComponents[step]

  if (!StepContent) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <ProgressBar currentStep={stepData.id} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-sm font-medium">
              Step {stepData.id}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {stepData.duration}
            </span>
          </div>
          <h1 className="text-3xl font-bold">{stepData.title}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {stepData.description}
          </p>
        </div>

        <div className="prose dark:prose-invert">
          <StepContent />
        </div>
      </div>

      <Navigation currentStep={stepData.id} />
    </div>
  )
}
