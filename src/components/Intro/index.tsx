import { ChatBubbleBottomCenterTextIcon, ClockIcon, FingerPrintIcon, BanknotesIcon } from '@heroicons/react/24/outline'
import './index.css';

const features = [
  {
    name: 'Accesibilidad',
    description:
      'Legal GPT está disponible en línea las 24 horas del día, los 7 días de la semana, lo que significa que puedes acceder a él desde cualquier lugar y en cualquier momento.',
    icon: ClockIcon,
  },
  {
    name: 'Ahorro de Tiempo y Dinero',
    description:
      'Legal GPT te ahorra tiempo y dinero en el proceso de obtener respuestas a tus preguntas legales.',
    icon: BanknotesIcon,
  },
  {
    name: 'Respuestas Precisas',
    description:
      'Los modelos ChatGPT utilizados por Legal GPT están específicamente entrenados para responder preguntas legales, lo que significa que puedes estar seguro de que las respuestas que obtienes son precisas y confiables.',
    icon: ChatBubbleBottomCenterTextIcon,
  },
  {
    name: 'Personalización',
    description:
      'Legal GPT puede adaptarse a tus necesidades específicas y responder a tus preguntas de manera personalizada. Además, puedes agregar tus propios documentos legales para obtener respuestas más precisas y personalizadas.',
    icon: FingerPrintIcon,
  },
]

export default function Intro() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className='wiki_image'></div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-gray-500">Tu Asistente Virtual en la Nube</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Descubre Cómo Legal GPT Puede Simplificar Tu Vida
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Legal GPT es una plataforma en línea que te permite acceder a modelos ChatGPT específicamente entrenados para responder preguntas sobre temas legales. Con Legal GPT, no es necesario gastar tiempo para obtener respuestas a tus preguntas legales.{' '}
            <b>¡Legal GPT lo hace por ti!</b>
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-black">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
