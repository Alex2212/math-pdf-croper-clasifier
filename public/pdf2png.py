import fitz
import base64
import sys

# print ('Argument List:', str(sys.argv))
# defaulter fitz.Rect(0,45, 700,765)

pdffile = str(sys.argv[1])
doc = fitz.open(pdffile)
scale = 1.3  # horizontal zoom
mat = fitz.Matrix(scale, scale)  # zoom factor 2 in each dimension
clip = fitz.Rect(0,50, 700,782)  # the area we want

if doc.pageCount == 2:
    clip = fitz.Rect(0,50, 700,782)  # the area we want
    page1 = doc.loadPage(0)
    page2 = doc.loadPage(1)
    pix1 = page1.getPixmap(matrix=mat,clip=clip)
    pix2 = page2.getPixmap(matrix=mat,clip=clip)
    pix = fitz.Pixmap(pix1.colorspace, (0, 0, pix1.width, pix1.height*2), pix1.alpha)

    for x in range(0,pix1.width):
        for y in range(0,pix1.height):
            pix.setPixel(x,y,pix1.pixel(x,y))
            pix.setPixel(x,y+pix1.height,pix2.pixel(x,y))
            
    # pix.writePNG("outfile.png")
    encoded = base64.b64encode(pix.getPNGData()).decode()
    
    print('data:image/png;base64,{}'.format(encoded))


else:
    page1 = doc.loadPage(0)
    pix1 = page1.getPixmap(matrix=mat,clip=clip)
    # pix1.writePNG("outfile.png")
    encoded = base64.b64encode(pix1.getPNGData()).decode()
    
    print('data:image/png;base64,{}'.format(encoded))
        
