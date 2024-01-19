import {getMetersToSecond} from '../src/screens/User/logic';

describe('getMetersToSecond function', () => {
  it('converts kilometers per hour to meters per second', () => {
    // Test case 1
    const result1 = getMetersToSecond(10);
    expect(result1).toBeCloseTo(2.78, 2);

    // Test case 2
    const result2 = getMetersToSecond(20);
    expect(result2).toBeCloseTo(5.56, 2);

    // Test case 3
    const result3 = getMetersToSecond(30);
    expect(result3).toBeCloseTo(8.33, 2);

    // Test case 4
    const result4 = getMetersToSecond(40);
    expect(result4).toBeCloseTo(11.11, 2);

    // Test case 5
    const result5 = getMetersToSecond(50);
    expect(result5).toBeCloseTo(13.89, 2);

    // Test case 6
    const result6 = getMetersToSecond(60);
    expect(result6).toBeCloseTo(16.67, 2);

    // Test case 7
    const result7 = getMetersToSecond(70);
    expect(result7).toBeCloseTo(19.44, 2);

    // Test case 8
    const result8 = getMetersToSecond(80);
    expect(result8).toBeCloseTo(22.22, 2);

    // Test case 9
    const result9 = getMetersToSecond(90);
    expect(result9).toBeCloseTo(25.0, 2);

    // Test case 10
    const result10 = getMetersToSecond(100);
    expect(result10).toBeCloseTo(27.78, 2);

    // You can also check console.log output using a spy
    const spy = jest.spyOn(console, 'log');

    // Call the function
    getMetersToSecond(30);

    // Check if console.log was called with the expected values
    expect(spy).toHaveBeenCalledWith('entrou km/h = ', 30);
    expect(spy).toHaveBeenCalledWith('METERS PER SECOND = ', 8.33);

    // Don't forget to restore the original console.log after the test
    spy.mockRestore();
  });
});
