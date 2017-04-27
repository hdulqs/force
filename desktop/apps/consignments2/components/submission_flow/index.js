import React from 'react'
import { connect } from 'react-redux'
import StepMarker from '../step_marker'

function SubmissionFlow({ currentStep, steps }) {
  const CurrentStepComponent = steps[currentStep].component
  const currentStepTitle = steps[currentStep].title

  return (
    <div className='consignments2-submission'>
      <div className='consignments2-submission__title'>
        Consign your work to Artsy in just a few steps
      </div>
      <StepMarker />
      <div className='consignments2-submission__step-title'>
        { currentStepTitle }
      </div>
      <div className='consignments2-submission__step-form'>
        <CurrentStepComponent />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentStep: state.submissionFlow.currentStep,
    steps: state.submissionFlow.steps
  }
}

export default connect(
  mapStateToProps,
)(SubmissionFlow)
