const fs = require('fs');
const { execSync} = require('child_process');
const { join } = require('path');

(() => {
  const utilsOriginalCode = 'Ly8gRE9OJ1QgQ0hBTkdFIFRIRSBDT0RFIEJFTE9XCgpmdW5jdGlvbiBnZXRVc2VySW5mbyh1c2VySWQpIHsKICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gewogICAgaWYgKHVzZXJJZCA9PT0gLTEpIHsKICAgICAgcmVqZWN0KG5ldyBFcnJvcignSW52YWxpZCB1c2VyIGlkJykpOwogICAgfQoKICAgIHNldFRpbWVvdXQoKCkgPT4gewogICAgICByZXNvbHZlKHsgaWQ6IHVzZXJJZCwgbmFtZTogJ0RpY29kaW5nJyB9KTsKICAgIH0sIDEwMDApOwogIH0pOwp9CgpmdW5jdGlvbiBnZXRVc2VyT3JkZXJzKHVzZXJJZCkgewogIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gewogICAgc2V0VGltZW91dCgoKSA9PiB7CiAgICAgIHJlc29sdmUoW3sgb3JkZXI6IDEsIHVzZXJJZCB9LCB7IG9yZGVyOiAyLCB1c2VySWQgfSwgeyBvcmRlcjogMywgdXNlcklkIH1dKTsKICAgIH0sIDUwMCk7CiAgfSk7Cn0KCmZ1bmN0aW9uIGdldFVzZXJDYXJ0SXRlbXModXNlcklkKSB7CiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7CiAgICBzZXRUaW1lb3V0KCgpID0+IHsKICAgICAgcmVzb2x2ZShbeyBpdGVtOiAxLCB1c2VySWQgfSwgeyBpdGVtOiAyLCB1c2VySWQgfV0pOwogICAgfSwgMjUwKTsKICB9KTsKfQoKbW9kdWxlLmV4cG9ydHMgPSB7IGdldFVzZXJJbmZvLCBnZXRVc2VyT3JkZXJzLCBnZXRVc2VyQ2FydEl0ZW1zIH07Cg==';
  const utilsDuringTestCode = 'Ly8gRE9OJ1QgQ0hBTkdFIFRIRSBDT0RFIEJFTE9XCgpmdW5jdGlvbiBnZXRVc2VySW5mbyh1c2VySWQpIHsKICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gewogICAgaWYgKHVzZXJJZCA9PT0gLTEpIHsKICAgICAgcmVqZWN0KG5ldyBFcnJvcignSW52YWxpZCB1c2VyIGlkJykpOwogICAgfQoKICAgIHNldFRpbWVvdXQoKCkgPT4gewogICAgICByZXNvbHZlKHsgaWQ6IHVzZXJJZCwgbmFtZTogJ0RpY29kaW5nJywgX3Rlc3Q6ICd4eHgnIH0pOwogICAgfSwgMTAwMCk7CiAgfSk7Cn0KCmZ1bmN0aW9uIGdldFVzZXJPcmRlcnModXNlcklkKSB7CiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7CiAgICBzZXRUaW1lb3V0KCgpID0+IHsKICAgICAgcmVzb2x2ZShbeyBvcmRlcjogMSwgdXNlcklkLCBfdGVzdDogJ3l5eScgfSwgeyBvcmRlcjogMiwgdXNlcklkLCBfdGVzdDogJ3l5eScgfSwgeyBvcmRlcjogMywgdXNlcklkLCBfdGVzdDogJ3l5eScgfV0pOwogICAgfSwgNTAwKTsKICB9KTsKfQoKZnVuY3Rpb24gZ2V0VXNlckNhcnRJdGVtcyh1c2VySWQpIHsKICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHsKICAgIHNldFRpbWVvdXQoKCkgPT4gewogICAgICByZXNvbHZlKFt7IGl0ZW06IDEsIHVzZXJJZCwgX3Rlc3Q6ICd6enonIH0sIHsgaXRlbTogMiwgdXNlcklkLCBfdGVzdDogJ3p6eicgfV0pOwogICAgfSwgMjUwKTsKICB9KTsKfQoKbW9kdWxlLmV4cG9ydHMgPSB7IGdldFVzZXJJbmZvLCBnZXRVc2VyT3JkZXJzLCBnZXRVc2VyQ2FydEl0ZW1zIH07Cg==';

  try {
    // write utils to testing mode
    fs.writeFileSync(join(__dirname, 'utils.js'), Buffer.from(utilsDuringTestCode, 'base64'));

    const originalUserCode = fs.readFileSync(join(__dirname, 'app.js'), 'utf-8');
    const additionalCodeToTest = 'CmNvbnN0IGFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpLnN0cmljdDsKCihhc3luYyAoKSA9PiB7CiAgdHJ5IHsKICAgIGFzc2VydC5lcXVhbCh0eXBlb2YgZ2V0VXNlckluZm8sICdmdW5jdGlvbicsICdQYXN0aWthbiBrYW11IG1lbmdpbXBvciBmdW5nc2kgYGdldFVzZXJJbmZvYC4gVW50dWsgdGF0YSBjYXJhIG1lbmdpbXBvciBuaWxhaSwgc2lsYWthbiBjZWsga2VtYmFsaSBtYXRlcmkgImh0dHBzOi8vd3d3LmRpY29kaW5nLmNvbS9hY2FkZW1pZXMvNjEwL3R1dG9yaWFscy8zMzU3MyIgRm9ybWF0IFNpc3RlbSBNb2R1bGFyaXNhc2kgZGkgTm9kZS5qcy4nKTsKICAgIGFzc2VydC5lcXVhbCh0eXBlb2YgZ2V0VXNlck9yZGVycywgJ2Z1bmN0aW9uJywgJ1Bhc3Rpa2FuIGthbXUgbWVuZ2ltcG9yIGZ1bmdzaSBgZ2V0VXNlck9yZGVyc2AuIFVudHVrIHRhdGEgY2FyYSBtZW5naW1wb3IgbmlsYWksIHNpbGFrYW4gY2VrIGtlbWJhbGkgbWF0ZXJpICJodHRwczovL3d3dy5kaWNvZGluZy5jb20vYWNhZGVtaWVzLzYxMC90dXRvcmlhbHMvMzM1NzMiIEZvcm1hdCBTaXN0ZW0gTW9kdWxhcmlzYXNpIGRpIE5vZGUuanMuJyk7CiAgICBhc3NlcnQuZXF1YWwodHlwZW9mIGdldFVzZXJDYXJ0SXRlbXMsICdmdW5jdGlvbicsICdQYXN0aWthbiBrYW11IG1lbmdpbXBvciBmdW5nc2kgYGdldFVzZXJDYXJ0SXRlbXNgLiBVbnR1ayB0YXRhIGNhcmEgbWVuZ2ltcG9yIG5pbGFpLCBzaWxha2FuIGNlayBrZW1iYWxpIG1hdGVyaSAiaHR0cHM6Ly93d3cuZGljb2RpbmcuY29tL2FjYWRlbWllcy82MTAvdHV0b3JpYWxzLzMzNTczIiBGb3JtYXQgU2lzdGVtIE1vZHVsYXJpc2FzaSBkaSBOb2RlLmpzLicpOwogICAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBnZXRVc2VyRGF0YSwgJ2Z1bmN0aW9uJywgJ0Z1bmdzaSBgZ2V0VXNlckRhdGFgIGJlbHVtIGRpZGVmaW5pc2lrYW4uIE1vaG9uIHVudHVrIGRpY2VrIGxhZ2ksIHlhISBeX14nKTsKCiAgICBjb25zdCB1c2VyRGF0YSA9IGF3YWl0IGdldFVzZXJEYXRhKDEpOwoKICAgIGFzc2VydC5lcXVhbCh0eXBlb2YgdXNlckRhdGEsICdvYmplY3QnLCAnRnVuZ3NpIGBnZXRVc2VyRGF0YWAgaGFydXMgbWVuZ2VtYmFsaWthbiBuaWxhaSBiZXJ1cGEgb2JqZWsuIEhhcmFwIHVudHVrIGRpY2VrIGxhZ2ksIHlhISBeX14nKTsKICAgIGFzc2VydC5lcXVhbCh0eXBlb2YgdXNlckRhdGEudXNlckluZm8sICdvYmplY3QnLCAnUHJvcGVydGkgYHVzZXJJbmZvYCBwYWRhIG9iamVrIHlhbmcgZGlrZW1iYWxpa2FuIG9sZWggZnVuZ3NpIGBnZXRVc2VyRGF0YWAgaGFydXMgYmVydXBhIG9iamVrLCB5YSEnKTsKICAgIGFzc2VydC5lcXVhbChBcnJheS5pc0FycmF5KHVzZXJEYXRhLnVzZXJPcmRlcnMpLCB0cnVlLCAnUHJvcGVydGkgYHVzZXJPcmRlcnNgIHBhZGEgb2JqZWsgeWFuZyBkaWtlbWJhbGlrYW4gb2xlaCBmdW5nc2kgYGdldFVzZXJEYXRhYCBoYXJ1cyBiZXJ1cGEgYXJyYXksIHlhIScpOwogICAgYXNzZXJ0LmVxdWFsKEFycmF5LmlzQXJyYXkodXNlckRhdGEudXNlckNhcnRJdGVtcyksIHRydWUsICdQcm9wZXJ0aSBgdXNlckNhcnRJdGVtc2AgcGFkYSBvYmplayB5YW5nIGRpa2VtYmFsaWthbiBvbGVoIGZ1bmdzaSBgZ2V0VXNlckRhdGFgIGhhcnVzIGJlcnVwYSBhcnJheSwgeWEhJyk7CgogICAgLy8gY2hlY2sgbmlsYWkgdXNlckRhdGEKICAgIGFzc2VydC5lcXVhbCh1c2VyRGF0YS51c2VySW5mby5pZCwgMSwgJ2B1c2VySW5mb2AgaGFydXMgbWVuZ2VtYmFsaWthbiBuaWxhaSB5YW5nIGRpa2VtYmFsaWthbiBvbGVoIGZ1bmdzaSBgZ2V0VXNlckluZm9gLiBIYXJhcCB1bnR1ayBkaWNlayBsYWdpLCB5YSEgXl9eJyk7CiAgICBhc3NlcnQuZXF1YWwodXNlckRhdGEudXNlckluZm8uX3Rlc3QsICd4eHgnLCAnYHVzZXJJbmZvYCBoYXJ1cyBtZW5nZW1iYWxpa2FuIG5pbGFpIHlhbmcgZGlrZW1iYWxpa2FuIG9sZWggZnVuZ3NpIGBnZXRVc2VySW5mb2AuIEhhcmFwIHVudHVrIGRpY2VrIGxhZ2ksIHlhISBeX14nKTsKCiAgICBhc3NlcnQuZXF1YWwodXNlckRhdGEudXNlck9yZGVyc1swXS51c2VySWQsIDEsICdgdXNlck9yZGVyc2AgaGFydXMgbWVuZ2VtYmFsaWthbiBuaWxhaSB5YW5nIGRpa2VtYmFsaWthbiBvbGVoIGZ1bmdzaSBgZ2V0VXNlck9yZGVyc2AuIEhhcmFwIHVudHVrIGRpY2VrIGxhZ2ksIHlhISBeX14nKTsKICAgIGFzc2VydC5lcXVhbCh1c2VyRGF0YS51c2VyT3JkZXJzWzBdLl90ZXN0LCAneXl5JywgJ2B1c2VyT3JkZXJzYCBoYXJ1cyBtZW5nZW1iYWxpa2FuIG5pbGFpIHlhbmcgZGlrZW1iYWxpa2FuIG9sZWggZnVuZ3NpIGBnZXRVc2VyT3JkZXJzYC4gSGFyYXAgdW50dWsgZGljZWsgbGFnaSwgeWEhIF5fXicpOwoKICAgIGFzc2VydC5lcXVhbCh1c2VyRGF0YS51c2VyQ2FydEl0ZW1zWzBdLnVzZXJJZCwgMSwgJ2B1c2Vyc0NhcnRJdGVtc2AgaGFydXMgbWVuZ2VtYmFsaWthbiBuaWxhaSB5YW5nIGRpa2VtYmFsaWthbiBvbGVoIGZ1bmdzaSBgZ2V0VXNlckNhcnRJdGVtc2AuIEhhcmFwIHVudHVrIGRpY2VrIGxhZ2ksIHlhISBeX14nKTsKICAgIGFzc2VydC5lcXVhbCh1c2VyRGF0YS51c2VyQ2FydEl0ZW1zWzBdLl90ZXN0LCAnenp6JywgJ2B1c2Vyc0NhcnRJdGVtc2AgaGFydXMgbWVuZ2VtYmFsaWthbiBuaWxhaSB5YW5nIGRpa2VtYmFsaWthbiBvbGVoIGZ1bmdzaSBgZ2V0VXNlckNhcnRJdGVtc2AuIEhhcmFwIHVudHVrIGRpY2VrIGxhZ2ksIHlhISBeX14nKTsKCiAgICAvLyByZWplY3Rpb24gY2hlY2sKICAgIGNvbnN0IHVzZXJEYXRhMiA9IGF3YWl0IGdldFVzZXJEYXRhKC0xKTsKICAgIGFzc2VydC5lcXVhbCh1c2VyRGF0YTIsIG51bGwsICdGdW5nc2kgYGdldFVzZXJEYXRhYCBoYXJ1cyBtZW5nZW1iYWxpa2FuIG5pbGFpIGBudWxsYCBqaWthIHNhbGFoIHNhdHUgUHJvbWlzZSB5YW5nIGRpZ3VuYWthbiBtZW5nYWxhbWkgcmVqZWN0aW9uLiBIYXJhcCB1bnR1ayBkaWNlayBsYWdpLCB5YSEgXl9eJyk7CiAgfSBjYXRjaCAoZXJyb3IpIHsKICAgIGlmIChlcnJvci5uYW1lID09PSAnQXNzZXJ0aW9uRXJyb3InKSB7CiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IubWVzc2FnZSk7CiAgICAgIHByb2Nlc3MuZXhpdCgxKTsKICAgIH0gZWxzZSB7CiAgICAgIGNvbnNvbGUuZXJyb3IoYEthbWkgZ2FnYWwgbWVuZ3VqaSBrb2RlIHlhbmcga2FtdSB0dWxpcy4gQmVyaWt1dCBlcnJvciB5YW5nIGRpaGFzaWxrYW46ICR7ZXJyb3IubWVzc2FnZX0gU2ltYWsgZXJyb3IgdGVyc2VidXQgZGFuIHBhc3Rpa2FuIGthbXUgc3VkYWggbWVudWxpc2thbiBrb2RlIGRlbmdhbiBiZW5hciwgeWEhYCk7CiAgICAgIHByb2Nlc3MuZXhpdCgxKTsKICAgIH0KICB9Cn0pKCk7Cg==';

    // write app.testing.js with content originalUserCode + additionalCodeToTest
    fs.writeFileSync(join(__dirname, 'app.testing.js'), originalUserCode + Buffer.from(additionalCodeToTest, 'base64').toString('utf-8'));

    // run the test
    execSync('node app.testing.js', { cwd: __dirname, stdio: 'pipe' });
    console.log('passed!')
  } catch (error) {
    const { stderr } = error;
    console.log(stderr.toString());
  } finally {
    // clean up
    fs.unlinkSync(join(__dirname, 'app.testing.js'));
    fs.writeFileSync(join(__dirname, 'utils.js'), Buffer.from(utilsOriginalCode, 'base64'));
  }
})();