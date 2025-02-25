def md_additionner(filepath_1, filepath_2, filepath_out):
    file_content_1 = ""
    file_content_2 = ""

    with open(filepath_1, "r", encoding="utf-8") as f1:
        file_content_1 = f1.read()
    with open(filepath_2, "r", encoding="utf-8") as f2:
        file_content_2 = f2.read()

    final_content = file_content_1 + file_content_2
    with open(filepath_out, "w", encoding="utf-8") as sortie:
        sortie.write(final_content)
    print("addtion and file out successfull in", filepath_out)
