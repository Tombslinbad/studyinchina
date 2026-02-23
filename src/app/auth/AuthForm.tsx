'use client'

import { useState } from 'react'
import { SignIn, SignUp } from '@clerk/nextjs'

interface AuthFormProps {
  isSignUp: boolean
  setIsSignUp: (v: boolean) => void
}

export default function AuthForm({ isSignUp, setIsSignUp }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="w-full">
      {/* Animated Tab Switcher */}
      <div className="relative flex mb-8 bg-slate-100/80 backdrop-blur-sm rounded-2xl p-1.5 shadow-inner">
        <div 
          className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-xl shadow-md transition-all duration-300 ease-out ${
            isSignUp ? 'left-[calc(50%+3px)]' : 'left-1.5'
          }`}
        />
        <button
          onClick={() => setIsSignUp(false)}
          className={`relative z-10 flex-1 py-3.5 px-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${
            !isSignUp 
              ? 'text-primary' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Sign In
          </span>
        </button>
        <button
          onClick={() => setIsSignUp(true)}
          className={`relative z-10 flex-1 py-3.5 px-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${
            isSignUp 
              ? 'text-primary' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Create Account
          </span>
        </button>
      </div>

      {/* Form Container with Glass Effect */}
      <div className="relative">
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-purple-500/20 to-primary/20 rounded-3xl blur-xl opacity-60"></div>
        
        <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/50">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-2xl shadow-lg mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mb-2">
              {isSignUp ? 'Join StudyChina' : 'Welcome Back'}
            </h1>
            <p className="text-slate-500 text-sm sm:text-base">
              {isSignUp 
                ? 'Start your journey to top Chinese universities' 
                : 'Sign in to continue your application'}
            </p>
          </div>

          {/* Clerk Auth Component */}
          <div className="min-h-[400px]">
            {isSignUp ? (
              <SignUp 
                appearance={{
                  elements: {
                    rootBox: 'w-full',
                    card: 'shadow-none p-0 bg-transparent',
                    header: 'hidden',
                    footer: 'hidden',
                    formFieldLabel: 'text-sm font-semibold text-slate-700 mb-1.5 block',
                    formFieldInput: 'w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200 text-slate-900 placeholder:text-slate-400',
                    formButtonPrimary: 'w-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all duration-200 mt-6',
                    socialButtonsBlockButton: 'w-full border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 py-3.5',
                    socialButtonsBlockButtonText: 'text-slate-700 font-medium',
                    dividerRow: 'my-6',
                    dividerText: 'text-slate-400 text-sm bg-white px-4',
                    dividerLine: 'bg-slate-200',
                    formFieldErrorText: 'text-red-500 text-sm mt-1',
                    alert: 'bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-4',
                    identityPreview: 'bg-slate-50 rounded-xl p-4 mb-4',
                    identityPreviewText: 'text-slate-700',
                    identityPreviewEditButton: 'text-primary hover:text-primary-dark font-medium',
                    formFieldSuccessText: 'text-green-600 text-sm mt-1',
                    otpCodeFieldInput: 'w-12 h-12 text-center text-xl border border-slate-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10',
                  }
                }}
                routing="path"
                path="/auth"
                signInUrl="/auth"
                redirectUrl="/dashboard"
              />
            ) : (
              <SignIn 
                appearance={{
                  elements: {
                    rootBox: 'w-full',
                    card: 'shadow-none p-0 bg-transparent',
                    header: 'hidden',
                    footer: 'hidden',
                    formFieldLabel: 'text-sm font-semibold text-slate-700 mb-1.5 block',
                    formFieldInput: 'w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200 text-slate-900 placeholder:text-slate-400',
                    formButtonPrimary: 'w-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all duration-200 mt-6',
                    socialButtonsBlockButton: 'w-full border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 py-3.5',
                    socialButtonsBlockButtonText: 'text-slate-700 font-medium',
                    dividerRow: 'my-6',
                    dividerText: 'text-slate-400 text-sm bg-white px-4',
                    dividerLine: 'bg-slate-200',
                    formFieldErrorText: 'text-red-500 text-sm mt-1',
                    alert: 'bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-4',
                    forgotPasswordLink: 'text-primary hover:text-primary-dark font-medium text-sm hover:underline transition-all',
                    identityPreview: 'bg-slate-50 rounded-xl p-4 mb-4',
                    identityPreviewText: 'text-slate-700',
                    identityPreviewEditButton: 'text-primary hover:text-primary-dark font-medium',
                  }
                }}
                routing="path"
                path="/auth"
                signUpUrl="/auth"
                redirectUrl="/dashboard"
              />
            )}
          </div>
        </div>
      </div>

      {/* Bottom Toggle */}
      <div className="mt-8 text-center">
        <p className="text-slate-600">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-primary font-semibold hover:text-primary-dark transition-colors relative group"
          >
            {isSignUp ? 'Sign In' : 'Create Account'}
            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </button>
        </p>
      </div>

      {/* Trust Badges */}
      <div className="mt-8 pt-6 border-t border-slate-200">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Secure SSL
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Verified by Clerk
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            GDPR Compliant
          </span>
        </div>
      </div>
    </div>
  )
}
