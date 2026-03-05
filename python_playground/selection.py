def sort(list_to_sort: list[int]) -> tuple[list[int], int]:
    loopcount = 0
    for i in range(0, len(list_to_sort) - 1):
        selected_item = list_to_sort[i]
        j = i + 1
        while list_to_sort[j] > selected_item and j < len(list_to_sort) - 1:
            j += 1
            loopcount += 1
        list_to_sort[i] = list_to_sort[j]
        list_to_sort[j] = selected_item
    return list_to_sort, loopcount
