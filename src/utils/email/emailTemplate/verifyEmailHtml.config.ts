export const verifyEmailHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Forgot Password OTP</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f2f2f2; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; padding: 10px; border-bottom: 1px solid #dddddd; background-color: #007BFF; color: #ffffff;">
            <h1>Forgot Password</h1>
        </div>
        <div style="padding: 20px; text-align: center;">
            <p style="font-size: 18px; color: #555555; font-weight: bold;"><span style="font-weight: bold; color: #009688;">Hello, {userName}</span></p>
            <p style="font-size: 18px; color: #555555; font-weight: bold;">Please use the following OTP to reset your password:</p>
            <div style="font-size: 24px; font-weight: bold; color: #007BFF; letter-spacing: 10px;">12345</div>
        </div>
        <div style="text-align: center; padding: 10px; border-top: 1px solid #dddddd; font-size: 12px; color: #777777;">
            <p>If you did not request this, please ignore this email.</p>
        </div>
    </div>
</body>
</html>
`