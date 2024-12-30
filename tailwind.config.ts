

const config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			spacing: {
				"104": "26rem",
				"112": "28rem",
				"128": "32rem",
				"144": "36rem",
				"160": "40rem",
				"176": "44rem",
			},
			animation: {
				"tada": "tada 1s ease-in-out infinite",
				"tada_once": "tada 1s ease-in-out ",
				"pop": "pop 0.6s ease-in-out",
				"slide_out_up": "slide-out-up 0.7s ease-in-out forwards",
				"slide_out_down": "slide-out-down 0.3s ease-in-out forwards",
				"slide_out_down_nohidden": "slide-out-nohidden 0.3s ease-in-out forwards",
				"slide_in_up": "slide-in-up 0.7s ease-in-out forwards",
				"slide_in_up_smooth_fast": "slide-in-up-smooth-fast 0.3s ease-in-out forwards",
				"rotate-in-12deg": "rotate-in-12 0.8s ease-out",
        		"rotate-in-6deg": "rotate-in-6 0.6s ease-out",
				"pulse-fade-in": "pulse-fade-in 0.3s ease-out",
				"pulse-fade-out": "pulse-fade-out 0.3s ease-in-out",
				scroll:
          		"scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
			},
			keyframes: {
				tada: {
					"0%": { transform: "scale(1)" },
					"10%": { transform: "scale(0.9) rotate(-3deg)" },
					"20%": { transform: "scale(0.9) rotate(-3deg)" },
					"30%": { transform: "scale(1.1) rotate(3deg)" },
					"40%": { transform: "scale(1.1) rotate(-3deg)" },
					"50%": { transform: "scale(1.1) rotate(3deg)" },
					"60%": { transform: "scale(1.1) rotate(-3deg)" },
					"70%": { transform: "scale(1.1) rotate(3deg)" },
					"80%": { transform: "scale(1.1) rotate(-3deg)" },
					"90%": { transform: "scale(1.1) rotate(3deg)" },
					"100%": { transform: "scale(1) rotate(0)" },
				},
				"pulse-fade-in": {
					"0%": {
					"transform": "scale(0.9)",
					"opacity": "0"
					},
					"50%": {
					"transform": "scale(1.05)",
					"opacity": "0.5"
					},
					"100%": {
					"transform": "scale(1)",
					"opacity": "1"
					}
				},
				"pulse-fade-out": {
					"0%": {
					"transform": "scale(1)",
					"opacity": "1"
					},
					"50%": {
					"transform": "scale(1.05)",
					"opacity": "0.5"
					},
					"100%": {
					"transform": "scale(0.9)",
					"opacity": "0",
					"visibility": "hidden"
					}
				},
				"rotate-in-6": {
					"0%": {
					  "opacity": "1",
					  "transform": "rotate(25deg)"
					},
					"100%": {
					  "opacity": "1",
					  "transform": "rotate(6deg)"
					}
				  },
				"rotate-in-12": {
				"0%": {
					"opacity": "1",
					"transform": "rotate(30deg)"
				},
				"100%": {
					"opacity": "1",
					"transform": "rotate(12deg)"
				}
				},
				"slide-out-up": {
                    "0%": {
                        transform: "translate3d(0, 0, 0)",
                    },
                    "100%": {
						visibility: "hidden",
                        opacity: "0%",
                        transform: "translate3d(0, -30%, 0)",
                    },
                },
				"slide-out-down": {
                    "0%": {
                        transform: "translate3d(0, 0, 0)",
                    },
                    "100%": {
                        opacity: "0%",
                        transform: "translate3d(0, 30%, 0)",
                    },
                },
				"slide-out-nohidden": {
                    "0%": {
                        transform: "translate3d(0, 0, 0)",
                    },
                    "100%": {
                        transform: "translate3d(0, 70%, 0)",
                    },
                },
				"slide-in-up-smooth-fast": {
                    "0%": {
						opacity: "0%",
                        transform: "translate3d(0, 50%, 0)",
                    },
                    "100%": {
						opacity: "100%",
                        transform: "translate3d(0, 0, 0)",
                    },
                },
				"slide-in-up": {
                    "0%": {
                        opacity: "100%",
                        transform: "translate3d(0, 30%, 0)",
                    },
                    "100%": {
                        transform: "translate3d(0, 0, 0)",
                    },
                },
				scroll: {
					to: {
					  transform: "translate(calc(-50% - 0.5rem))",
					},
				  },
				pop: {
					"0%": {
					"transform": "scale(1)"
					},
					"50%": {
					"transform": "scale(1.1)"
					},
					"100%": {
					"transform": "scale(1)"
					}
  				}
			},
			transitionTimingFunction: {
				sync: "cubic-bezier(0, 1, 0, 1)",
			},
			colors: {
				answerBad: {
					500: "#F75064",
				  },
				  answerGood: {
					500: "#82D350",
				  },
				  grey: {
					500: "#6A6A6A",
				  },
				  blue: {
					500: "#051B71",
				  },
				  green: {
					300: "#D3E0BE",
					800: "#5c7537",
					900: "#34441c",
				  },
				  gameSwipe: {
					left: "#fcbab6",
					neutral: "#fafafa",
					right: "#D4E0B2",
				  },
				xanh_nhat: "",
				primary: "#F8F9FA",
				do: "#B71C1C",
				do_700:"#D32F2F",
				do_600:"#E53935",
				do_bg: "#ea2b2b",
				xanh_duong: "#160092",
				xanh_duong_bg: "#01012d",
				den: "#161616",
				xam: "#A4A4A4",
				xam_bg: "#2729291A",
				cam: "#F7B301",
				cam_bg: "#F7B3011A",


				//lam quiz
				do_quiz: "#d42525",
				xanh_quiz:"#295ecf"
			},
			transitionProperty: {
				"max-height": "max-height",
			},
			backgroundImage: {
				Logo_whiteBG:"url('../../public/photos/LOGO_whiteBG.png')",
				reading: "url('../../public/photos/reading.jpg')",
				listening: "url('../../public/photos/listening.jpg')",
				writing: "url('../../public/photos/writing.jpg')",
				speaking: "url('../../public/photos/speaking.jpg')",
				general: "url('../../public/photos/LOGO_power.png')",
				halloffame: "url('../../public/photos/hallofame.png')",
				ieltsBG: "url('../../public/photos/ieltsBG.jpg')",
				darkBlue: "url('../../public/photos/darkBluepattern.jpg')",
				desktop_use: "url('../../public/photos/desktopuse.png')",
				banner:"url('../../public/photos/banner_study.png')",
				LitghRedGradient:
				'linear-gradient(-45deg, #ff5959, #ff4040, #ff0d6e, #ff8033,#d74177)',
			},
		},
	},
	plugins: [],
};
export default config;