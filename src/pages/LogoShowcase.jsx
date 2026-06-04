import Logo3D from '../components/Logo3D';
import { motion } from 'framer-motion';

export default function LogoShowcase() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-900 to-orange-700 bg-clip-text text-transparent mb-4">
                        Pareshey Organic 3D Animated Logo
                    </h1>
                    <p className="text-lg text-amber-700">Clean organic skincare brand identity with 3D animation</p>
                </motion.div>

                {/* Logo Showcase - Different Sizes */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
                    {[
                        { size: 'sm', label: 'Small (64px)' },
                        { size: 'md', label: 'Medium (96px)' },
                        { size: 'lg', label: 'Large (128px)' },
                        { size: 'xl', label: 'Extra Large (160px)' }
                    ].map((item) => (
                        <motion.div
                            key={item.size}
                            className="flex flex-col items-center justify-start p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="flex items-center justify-center h-48">
                                <Logo3D size={item.size} />
                            </div>
                            <p className="text-center text-sm font-semibold text-gray-600 mt-4">
                                {item.label}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Features Section */}
                <motion.div
                    className="bg-white rounded-2xl shadow-xl p-12 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <h2 className="text-3xl font-bold text-amber-900 mb-8">Logo Features</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                title: '3D Rotating Effect',
                                description: 'Smooth continuous rotation that speeds up on hover for engaging interaction'
                            },
                            {
                                title: 'Animated Liquid',
                                description: 'Liquid inside bottle waves naturally, creating depth and luxury feel'
                            },
                            {
                                title: 'Sparkle Effects',
                                description: 'Floating particles that simulate splashing oil/serum drops'
                            },
                            {
                                title: 'Ambient Glow',
                                description: 'Soft golden glow that pulses dynamically around the bottle'
                            },
                            {
                                title: 'Glass Shine',
                                description: 'Realistic light reflections on bottle surface for premium look'
                            },
                            {
                                title: 'Responsive Sizing',
                                description: 'Available in 4 sizes (sm, md, lg, xl) that scale perfectly'
                            }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-200"
                                whileHover={{ scale: 1.02 }}
                            >
                                <h3 className="text-lg font-bold text-amber-900 mb-2">{feature.title}</h3>
                                <p className="text-amber-700">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Usage Instructions */}
                <motion.div
                    className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    <h2 className="text-3xl font-bold text-amber-900 mb-6">How to Use</h2>
                    <div className="space-y-4 text-amber-800">
                        <div>
                            <h3 className="font-bold mb-2">1. Import the component:</h3>
                            <code className="block bg-white p-3 rounded border border-amber-200 font-mono text-sm">
                                {'import Logo3D from \'./components/Logo3D\';'}
                            </code>
                        </div>
                        <div>
                            <h3 className="font-bold mb-2">2. Use in your component:</h3>
                            <code className="block bg-white p-3 rounded border border-amber-200 font-mono text-sm">
                                {'<Logo3D size="md" />'}
                            </code>
                        </div>
                        <div>
                            <h3 className="font-bold mb-2">3. Available sizes:</h3>
                            <p className="ml-4">• sm (64px) • md (96px) • lg (128px) • xl (160px)</p>
                        </div>
                        <div>
                            <h3 className="font-bold mb-2">4. Perfect for:</h3>
                            <p className="ml-4">• Header/Navigation • Hero Section • Brand Identity • Loading States • Product Cards</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
