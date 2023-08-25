export const add = (a = 0, b = 0) =>  a + b

if(import.meta.vitest){
    const {it, expect} = import.meta.vitest
    it('add', () => {
        expect(add(1, 2)).toBe(3);
        expect(add()).toBe(0);
    })
}