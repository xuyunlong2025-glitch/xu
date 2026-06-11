import pdfplumber

pdf_path = r'd:\我的机器人\讲师机器人\空调自动控制与节能.pdf'

with pdfplumber.open(pdf_path) as pdf:
    print(f'总页数: {len(pdf.pages)}')
    
    # 检查每一页是否有文本
    for i, page in enumerate(pdf.pages[:20]):
        text = page.extract_text()
        print(f'第 {i+1} 页: 文本长度 = {len(text) if text else 0}')
        if text and len(text) > 0:
            print(f'前200字符: {text[:200]}')
            print('---')
