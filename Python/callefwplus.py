import urllib,httplib2
api_args='{"sysright": {"token": ""},"plugin": "Books.Service","controller": "bookWcfController","method": "GetBooks"}'
print api_args
api_url='http://36.111.200.233:7711/httpservice/'
print api_url

h=httplib2.Http()
resp,content=h.request(api_url,"POST",api_args,headers={'Content-Type':'application/json'})
print content

