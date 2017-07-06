import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;

public class callapi
{
    private static final String targetURL = "http://36.111.200.233:7711/httpservice/";
    private static String inputData="{\"sysright\": {\"token\": \"\"},\"plugin\": \"Books.Service\",\"controller\": \"bookWcfController\",\"method\": \"GetBooks\"}";
    public static void main(String[] args)
    {
        //System.out.println("Hello World!");
 		try {

                     URL targetUrl = new URL(targetURL);

                     HttpURLConnection httpConnection = (HttpURLConnection) targetUrl.openConnection();
                     httpConnection.setDoOutput(true);
                     httpConnection.setRequestMethod("POST");
                     httpConnection.setRequestProperty("Content-Type", "application/json");

                     OutputStream outputStream = httpConnection.getOutputStream();
                     outputStream.write(inputData.getBytes());
                     outputStream.flush();

                     if (httpConnection.getResponseCode() != 200) {
                            throw new RuntimeException("Failed : HTTP error code : "
                                   + httpConnection.getResponseCode());
                     }

                     BufferedReader responseBuffer = new BufferedReader(new InputStreamReader(
                                   (httpConnection.getInputStream())));

                     String output;
                     System.out.println("Output from Server:\n");
                     while ((output = responseBuffer.readLine()) != null) {
                            System.out.println(output);
                     }

                     httpConnection.disconnect();

                } catch (Exception e) {

                     e.printStackTrace();

               }
    }
}
