const DetectDevice = {
  isMobileOrTablet: (width, height) => {
    return window.matchMedia('screen and (max-width: 992px)').matches
  }
}

export default DetectDevice
