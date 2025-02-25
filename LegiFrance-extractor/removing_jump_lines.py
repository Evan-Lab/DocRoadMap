def remove_jump_lines(file):
    with open(file, "r") as f:
        lines = f.readlines()

    in_content = False
    for i in range(len(lines)):
        if "[Contenu]" in lines[i]:
            in_content = True
        elif "[" in lines[i] and "]" in lines[i]:
            if "UUID" in lines[i]:
                in_content = False

        if in_content:
            lines[i] = lines[i].replace("\n", "")

    with open(file, "w") as f:
        f.writelines(lines)


filename = "format_CCAG.md"
remove_jump_lines(filename)
