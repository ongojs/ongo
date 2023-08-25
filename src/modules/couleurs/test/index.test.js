const  couleurs = require('../')();
describe('Color_Off', chain => {
    const {Color_Off} = couleurs
    it('should return a string with no native bash color', context => {
        const colorString = Color_Off('some-string');
        expect(colorString).toBe(`\x1b[0msome-string\x1b[0m`);
    })
    it('should not return a string with a native bash color', context => {
        const colorString = Color_Off('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
})

describe('Black', chain => {
    const {Black} = couleurs
    it('should return a string with native black bash color', context => {
        const colorString = Black('some-string');
        expect(colorString).toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native black bash color', context => {
        const colorString = Black('some-string');
        expect(colorString).not.toBe(`\x1b[0;31msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = Black('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})

//0;32m
describe('Red', chain => {
    const {Red} = couleurs
    it('should return a string with native red bash color', context => {
        const colorString = Red('some-string');
        expect(colorString).toBe(`\x1b[0;31msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native red bash color', context => {
        const colorString = Red('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = Red('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})
describe('Green', chain => {
    const {Green} = couleurs
    it('should return a string with native green bash color', context => {
        const colorString = Green('some-string');
        expect(colorString).toBe(`\x1b[0;32msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native green bash color', context => {
        const colorString = Green('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = Green('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})
describe('Yellow', chain => {
    const {Yellow} = couleurs
    it('should return a string with native yello bash color', context => {
        const colorString = Yellow('some-string');
        expect(colorString).toBe(`\x1b[0;33msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native yellow bash color', context => {
        const colorString = Yellow('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = Yellow('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})
describe('Blue', chain => {
    const {Blue} = couleurs
    it('should return a string with native blue bash color', context => {
        const colorString = Blue('some-string');
        expect(colorString).toBe(`\x1b[0;34msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native blue bash color', context => {
        const colorString = Blue('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = Blue('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})
describe('Purple', chain => {
    const {Purple} = couleurs
    it('should return a string with native purple bash color', context => {
        const colorString = Purple('some-string');
        expect(colorString).toBe(`\x1b[0;35msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native purple bash color', context => {
        const colorString = Purple('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = Purple('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})
describe('Cyan', chain => {
    const {Cyan} = couleurs
    it('should return a string with native cyan bash color', context => {
        const colorString = Cyan('some-string');
        expect(colorString).toBe(`\x1b[0;36msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native cyan bash color', context => {
        const colorString = Cyan('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = Cyan('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})

describe('White', chain => {
    const {White} = couleurs
    it('sshould return a string with native whith bash color', context => {
        const colorString = White('some-string');
        expect(colorString).toBe(`\x1b[0;37msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native white bash color', context => {
        const colorString = White('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = White('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})
describe('BBlack', chain => {
    const {BBlack} = couleurs
    it('should return a string with native bold black bash color', context => {
        const colorString = BBlack('some-string');
        expect(colorString).toBe(`\x1b[1;30msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native bold black bash color', context => {
        const colorString = BBlack('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = BBlack('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})

describe('BRed', chain => {
    const {BRed} = couleurs
    it('should return a string with native bold red bash color', context => {
        const colorString = BRed('some-string');
        expect(colorString).toBe(`\x1b[1;31msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native bold red bash color', context => {
        const colorString = BRed('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = BRed('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})
describe('BGreen', chain => {
    const {BGreen} = couleurs
    it('should return a string with native bold green bash color', context => {
        const colorString = BGreen('some-string');
        expect(colorString).toBe(`\x1b[1;32msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native bold green bash color', context => {
        const colorString = BGreen('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = BGreen('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})


describe('BYellow', chain => {
    const {BYellow} = couleurs
    it('should return a string with native bold yellow bash color', context => {
        const colorString = BYellow('some-string');
        expect(colorString).toBe(`\x1b[1;33msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native bold yellow bash color', context => {
        const colorString = BYellow('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = BYellow('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})
describe('BBlue', chain => {
    const {BBlue} = couleurs
    it('should return a string with native bold blue bash color', context => {
        const colorString = BBlue('some-string');
        expect(colorString).toBe(`\x1b[1;34msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native bold blue bash color', context => {
        const colorString = BBlue('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = BBlue('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})
describe('BPurple', chain => {
    const {BPurple} = couleurs
    it('should return a string with native bold purple bash color', context => {
        const colorString = BPurple('some-string');
        expect(colorString).toBe(`\x1b[1;35msome-string\x1b[0m`);
    })
    it('should not return a stringof a color other than the native bold purple bash color', context => {
        const colorString = BPurple('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = BPurple('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})
describe('BCyan', chain => {
    const {BCyan} = couleurs
    it('sshould return a string with native bold cyan bash color', context => {
        const colorString = BCyan('some-string');
        expect(colorString).toBe(`\x1b[1;36msome-string\x1b[0m`);
    })
    it('should not return a string with of a color other than the native bold cyan bash color', context => {
        const colorString = BCyan('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = BCyan('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})

describe('BWhite', chain => {
    const {BWhite} = couleurs
    it('should return a string with native bold white bash color', context => {
        const colorString = BWhite('some-string');
        expect(colorString).toBe(`\x1b[1;37msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native bold white bash color', context => {
        const colorString = BWhite('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = BWhite('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})



describe('UBlack', chain => {
    const {UBlack} = couleurs
    it('should return a string with native underline black bash color', context => {
        const colorString = UBlack('some-string');
        expect(colorString).toBe(`\x1b[4;30msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native underline black bash color', context => {
        const colorString = UBlack('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = UBlack('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})

describe('URed', chain => {
    const {URed} = couleurs
    it('should return a string with native undline red bash color', context => {
        const colorString = URed('some-string');
        expect(colorString).toBe(`\x1b[4;31msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native underline red bash color', context => {
        const colorString = URed('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = URed('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})
describe('UGreen', chain => {
    const {UGreen} = couleurs
    it('should return a string with native underline green bash color', context => {
        const colorString = UGreen('some-string');
        expect(colorString).toBe(`\x1b[4;32msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native underline green bash color', context => {
        const colorString = UGreen('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = UGreen('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})


describe('UYellow', chain => {
    const {UYellow} = couleurs
    it('should return a string with native underline yellow bash color', context => {
        const colorString = UYellow('some-string');
        expect(colorString).toBe(`\x1b[4;33msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native underline yellow bash color', context => {
        const colorString = UYellow('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = UYellow('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})
describe('UBlue', chain => {
    const {UBlue} = couleurs
    it('should return a string with native underline blue bash color', context => {
        const colorString = UBlue('some-string');
        expect(colorString).toBe(`\x1b[4;34msome-string\x1b[0m`);
    })
    it('should not return a string with of a color other than the native underline blue bash color', context => {
        const colorString = UBlue('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = UBlue('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})
describe('UPurple', chain => {
    const {UPurple} = couleurs
    it('should return a string with native underline purple bash color', context => {
        const colorString = UPurple('some-string');
        expect(colorString).toBe(`\x1b[4;35msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native underline purple bash color', context => {
        const colorString = UPurple('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = UPurple('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})
describe('UCyan', chain => {
    const {UCyan} = couleurs
    it('should return a string with native underline cyan bash color', context => {
        const colorString = UCyan('some-string');
        expect(colorString).toBe(`\x1b[4;36msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native underline cyan bash color', context => {
        const colorString = UCyan('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = UCyan('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})

describe('UWhite', chain => {
    const {UWhite} = couleurs
    it('should return a string with native underline white bash color', context => {
        const colorString = UWhite('some-string');
        expect(colorString).toBe(`\x1b[4;37msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native underline white bash color', context => {
        const colorString = UWhite('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = UWhite('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})




describe('On_Black', chain => {
    const {On_Black} = couleurs
    it('should return a string with native black background bash color', context => {
        const colorString = On_Black('some-string');
        expect(colorString).toBe(`\x1b[40msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native black bash background color', context => {
        const colorString = On_Black('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = On_Black('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})

describe('On_Red', chain => {
    const {On_Red} = couleurs
    it('should return a string with native red background bash color', context=> {
        const colorString = On_Red('some-string');
        expect(colorString).toBe(`\x1b[41msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native red bash background  color', context=> {
        const colorString = On_Red('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context=> {
        const colorString = On_Red('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})
describe('On_Green', chain => {
    const {On_Green} = couleurs
    it('should return a string with native green background bash color', context => {
        const colorString = On_Green('some-string');
        expect(colorString).toBe(`\x1b[42msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native green bash background color', context => {
        const colorString = On_Green('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = On_Green('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})


describe('On_Yellow', chain => {
    const {On_Yellow} = couleurs
    it('should return a string with native yellow background bash color', context => {
        const colorString = On_Yellow('some-string');
        expect(colorString).toBe(`\x1b[43msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native yellow bash background color', context => {
        const colorString = On_Yellow('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = On_Yellow('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})
describe('On_Blue', chain => {
    const {On_Blue} = couleurs
    it('should return a string with native blue background bash color', context => {
        const colorString = On_Blue('some-string');
        expect(colorString).toBe(`\x1b[44msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native blue bash background color', context => {
        const colorString = On_Blue('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = On_Blue('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})
describe('On_Purple', chain => {
    const {On_Purple} = couleurs
    it('should return a string with native purple background bash color', context => {
        const colorString = On_Purple('some-string');
        expect(colorString).toBe(`\x1b[45msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native purple bash background color', context => {
        const colorString = On_Purple('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = On_Purple('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})
describe('On_Cyan', chain => {
    const {On_Cyan} = couleurs
    it('should return a string with native cyan background bash color', context => {
        const colorString = On_Cyan('some-string');
        expect(colorString).toBe(`\x1b[46msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native cyan bash background color', context => {
        const colorString = On_Cyan('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = On_Cyan('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})

describe('On_White', chain => {
    const {On_White} = couleurs
    it('should return a string with native white background bash color', context => {
        const colorString = On_White('some-string');
        expect(colorString).toBe(`\x1b[47msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native white bash background color', context => {
        const colorString = On_White('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = On_White('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})






describe('IBlack', chain => {
    const {IBlack} = couleurs
    it('should return a string with native high intensity black bash color', context => {
        const colorString = IBlack('some-string');
        expect(colorString).toBe(`\x1b[0;90msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native high intensity black bash color', context => {
        const colorString = IBlack('some-string');
        expect(colorString).not.toBe(`\x1b[0;31msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = IBlack('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})

//0;32m
describe('IRed', chain => {
    const {IRed} = couleurs
    it('should return a string with native high intensity red bash color', context => {
        const colorString = IRed('some-string');
        expect(colorString).toBe(`\x1b[0;91msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native high intensity red bash color', context => {
        const colorString = IRed('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = IRed('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})
describe('IGreen', chain => {
    const {IGreen} = couleurs
    it('should return a string with native high intensity green bash color', context => {
        const colorString = IGreen('some-string');
        expect(colorString).toBe(`\x1b[0;92msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native high intensity green bash color', context => {
        const colorString = IGreen('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = IGreen('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})
describe('IYellow', chain => {
    const {IYellow} = couleurs
    it('should return a string with native high intensity yellow bash color', context => {
        const colorString = IYellow('some-string');
        expect(colorString).toBe(`\x1b[0;93msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native high intensity yellow bash color', context => {
        const colorString = IYellow('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = IYellow('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})
describe('IBlue', chain => {
    const {IBlue} = couleurs
    it('should return a string with native high intensity blue bash color', context => {
        const colorString = IBlue('some-string');
        expect(colorString).toBe(`\x1b[0;94msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native high intensity blue bash color', context => {
        const colorString = IBlue('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = IBlue('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})
describe('IPurple', chain => {
    const {IPurple} = couleurs
    it('should return a string with native high intensity purple bash color', context => {
        const colorString = IPurple('some-string');
        expect(colorString).toBe(`\x1b[0;95msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native high intensity purple bash color', context => {
        const colorString = IPurple('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = IPurple('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})
describe('ICyan', chain => {
    const {ICyan} = couleurs
    it('should return a string with native high intensity cyan bash color', context => {
        const colorString = ICyan('some-string');
        expect(colorString).toBe(`\x1b[0;96msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native high intensity cyan bash color', context => {
        const colorString = ICyan('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = ICyan('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})

describe('IWhite', chain => {
    const {IWhite} = couleurs
    it('should return a string with native high intensity white bash color', context => {
        const colorString = IWhite('some-string');
        expect(colorString).toBe(`\x1b[0;97msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native high intensity white bash color', context => {
        const colorString = IWhite('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = IWhite('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})





describe('BIBlack', chain => {
    const {BIBlack} = couleurs
    it('should return a string with native bold high intensity black bash color', context => {
        const colorString = BIBlack('some-string');
        expect(colorString).toBe(`\x1b[1;90msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native bold high intensity black bash color', context => {
        const colorString = BIBlack('some-string');
        expect(colorString).not.toBe(`\x1b[0;31msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = BIBlack('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})

//0;32m
describe('BIRed', chain => {
    const {BIRed} = couleurs
    it('should return a string with native bold high intensity red bash color', context => {
        const colorString = BIRed('some-string');
        expect(colorString).toBe(`\x1b[1;91msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native bold high intensity red bash color', context => {
        const colorString = BIRed('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = BIRed('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})
describe('BIGreen', chain => {
    const {BIGreen} = couleurs
    it('should return a string with native bold high intensity green bash color', context => {
        const colorString = BIGreen('some-string');
        expect(colorString).toBe(`\x1b[1;92msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native bold high intensity green bash color', context => {
        const colorString = BIGreen('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = BIGreen('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})
describe('BIYellow', chain => {
    const {BIYellow} = couleurs
    it('should return a string with native bold high intensity yellow bash color', context => {
        const colorString = BIYellow('some-string');
        expect(colorString).toBe(`\x1b[1;93msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native bold high intensity yellow bash color', context => {
        const colorString = BIYellow('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = BIYellow('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})
describe('BIBlue', chain => {
    const {BIBlue} = couleurs
    it('should return a string with native bold high intensity blue bash color', context => {
        const colorString = BIBlue('some-string');
        expect(colorString).toBe(`\x1b[1;94msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native bold high intensity blue bash color', context => {
        const colorString = BIBlue('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = BIBlue('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})
describe('BIPurple', chain => {
    const {BIPurple} = couleurs
    it('should return a string with native bold high intensity purple bash color', context => {
        const colorString = BIPurple('some-string');
        expect(colorString).toBe(`\x1b[1;95msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native bold high intensity purple bash color', context => {
        const colorString = BIPurple('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = BIPurple('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})
describe('BICyan', chain => {
    const {BICyan} = couleurs
    it('should return a string with native bold high intensity cyan bash color', context => {
        const colorString = BICyan('some-string');
        expect(colorString).toBe(`\x1b[1;96msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native bold high intensity cyan bash color', context => {
        const colorString = BICyan('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = BICyan('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})

describe('BIWhite', chain => {
    const {BIWhite} = couleurs
    it('should return a string with native bold high intensity white bash color', context => {
        const colorString = BIWhite('some-string');
        expect(colorString).toBe(`\x1b[1;97msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than the native bold high intensity white bash color', context => {
        const colorString = BIWhite('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = BIWhite('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})


describe('On_IBlack', chain => {
    const {On_IBlack} = couleurs
    it('should return a string with native high intensity black bash background color', context => {
        const colorString = On_IBlack('some-string');
        expect(colorString).toBe(`\x1b[0;100msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than native high intensity black bash background color', context => {
        const colorString = On_IBlack('some-string');
        expect(colorString).not.toBe(`\x1b[0;31msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = On_IBlack('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})

//0;32m
describe('On_IRed', chain => {
    const {On_IRed} = couleurs
    it('should return a string with native high intensity red bash background color', context => {
        const colorString = On_IRed('some-string');
        expect(colorString).toBe(`\x1b[0;101msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than native high intensity red bash background color', context => {
        const colorString = On_IRed('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = On_IRed('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})
describe('On_IGreen', chain => {
    const {On_IGreen} = couleurs
    it('should return a string with native high intensity green bash background color', context => {
        const colorString = On_IGreen('some-string');
        expect(colorString).toBe(`\x1b[0;102msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than native high intensity green bash background color', context => {
        const colorString = On_IGreen('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = On_IGreen('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})
describe('On_IYellow', chain => {
    const {On_IYellow} = couleurs
    it('should return a string with native high intensity yellow bash background color', context => {
        const colorString = On_IYellow('some-string');
        expect(colorString).toBe(`\x1b[0;103msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than native high intensity yellow bash background color', context => {
        const colorString = On_IYellow('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = On_IYellow('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})
describe('On_IBlue', chain => {
    const {On_IBlue} = couleurs
    it('should return a string with native high intensity black blue background color', context => {
        const colorString = On_IBlue('some-string');
        expect(colorString).toBe(`\x1b[0;104msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than native high intensity blue bash background color', context => {
        const colorString = On_IBlue('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = On_IBlue('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})
describe('On_IPurple', chain => {
    const {On_IPurple} = couleurs
    it('should return a string with native high intensity black purple background color', context => {
        const colorString = On_IPurple('some-string');
        expect(colorString).toBe(`\x1b[0;105msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than native high intensity purple bash background color', context => {
        const colorString = On_IPurple('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = On_IPurple('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})
describe('On_ICyan', chain => {
    const {On_ICyan} = couleurs
    it('should return a string with native high intensity cyan bash background color', context => {
        const colorString = On_ICyan('some-string');
        expect(colorString).toBe(`\x1b[0;106msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than native high intensity cyan bash background bash color', context => {
        const colorString = On_ICyan('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = On_ICyan('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})

describe('On_IWhite', chain => {
    const {On_IWhite} = couleurs
    it('should return a string with native high intensity white bash background color', context => {
        const colorString = On_IWhite('some-string');
        expect(colorString).toBe(`\x1b[0;107msome-string\x1b[0m`);
    })
    it('should not return a string of a color other than native high intensity white bash background color', context => {
        const colorString = On_IWhite('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = On_IWhite('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})



describe('Reset', chain => {
    const {Reset} = couleurs
    it('should return a string with no native bash color', context => {
        const colorString = Reset('some-string');
        expect(colorString).toBe(`\x1b[0msome-string\x1b[0m`);
    })
    it('should not return a string with a different native bash color', context => {
        const colorString = Reset('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
})

describe('Bright', chain => {
    const {Bright} = couleurs
    it('should return a string with no native bash color', context => {
        const colorString = Bright('some-string');
        expect(colorString).toBe(`\x1b[1msome-string\x1b[0m`);
    })
    it('should not return a string with a different native bash color', context => {
        const colorString = Bright('some-string');
        expect(colorString).not.toBe(`\x1b[0;30msome-string\x1b[0m`);
    })
    it('should not return a string with no native bash color', context => {
        const colorString = Bright('some-string');
        expect(colorString).not.toBe(`\x1b[0msome-string\x1b[0m`);
    })
})

