import {getKilometersToHour} from '../src/screens/User/logic';

describe('getKilometersToHour function', () => {
  it('converts meters per second to kilometers per hour', () => {
    // Test case 1
    const result1 = getKilometersToHour(2.78);
    expect(result1).toBeCloseTo(10, 2);

    // Test case 2
    const result2 = getKilometersToHour(5.56);
    expect(result2).toBeCloseTo(20, 2);

    // Test case 3
    const result3 = getKilometersToHour(8.33);
    expect(result3).toBeCloseTo(30, 2);

    // Test case 4
    const result4 = getKilometersToHour(11.11);
    expect(result4).toBeCloseTo(40, 2);

    // Test case 5
    const result5 = getKilometersToHour(13.89);
    expect(result5).toBeCloseTo(50, 2);

    // Test case 6
    const result6 = getKilometersToHour(16.67);
    expect(result6).toBeCloseTo(60, 2);

    // Test case 7
    const result7 = getKilometersToHour(19.44);
    expect(result7).toBeCloseTo(70, 2);

    // Test case 8
    const result8 = getKilometersToHour(22.22);
    expect(result8).toBeCloseTo(80, 2);

    // Test case 9
    const result9 = getKilometersToHour(25.0);
    expect(result9).toBeCloseTo(90, 2);

    // Test case 10
    const result10 = getKilometersToHour(27.78);
    expect(result10).toBeCloseTo(100, 2);

    // You can also check console.log output using a spy
    const spy = jest.spyOn(console, 'log');

    // Call the function
    getKilometersToHour(10);

    // Check if console.log was called with the expected values
    expect(spy).toHaveBeenCalledWith('entrou m/s = ', 10);
    expect(spy).toHaveBeenCalledWith('KILOMETERS PER HOUR = ', 36);

    // Don't forget to restore the original console.log after the test
    spy.mockRestore();
  });
});
