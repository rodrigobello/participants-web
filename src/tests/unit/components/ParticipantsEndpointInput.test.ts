import { describe, it, expect } from "vitest";

import { shallowMount } from "@vue/test-utils";
import { ParticipantsEndpointInput } from "@participant/components";

describe("ParticipantsEndpointInput.vue", () => {
  const wrapper = shallowMount(ParticipantsEndpointInput);
  const input = wrapper.find("input");
  const button = wrapper.find("button");
  const errorMessage = wrapper.find("p#endpoint-error");

  it("button is not disabled when endpoint input is not empty", async () => {
    await input.setValue("https://jsonplaceholder.typicode.com/todos");
    expect(button.attributes().disabled).not.toBeDefined();
  });

  it("button is disabled when endpoint input is empty", async () => {
    await input.setValue("");
    expect(button.attributes().disabled).toBeDefined();
  });

  it("input does not display validatiopn error when endpoint is valid", async () => {
    await input.setValue("https://jsonplaceholder.typicode.com/todos");
    expect(input.attributes()["aria-invalid"]).toBe("false");
    expect(errorMessage.isVisible()).not.toBe(true);
  });

  it("input does not display validatiopn error when endpoint is empty", async () => {
    await input.setValue("");
    expect(input.attributes()["aria-invalid"]).toBe("false");
    expect(errorMessage.isVisible()).not.toBe(true);
  });

  it("input display validation error when endpoint is not valid", async () => {
    await input.setValue("foo bar");
    expect(input.attributes()["aria-invalid"]).toBe("true");
    expect(errorMessage.isVisible()).toBe(true);
  });

  it("click on button emits event and clears the endpoint input", async () => {
    const endpoint: string = "https://jsonplaceholder.typicode.com/todos";

    await input.setValue(endpoint);
    await button.trigger("click");

    expect(input.element.value).toBe("");
    expect(wrapper.emitted().load).toBeTruthy();
    expect(wrapper.emitted().load.length).toBe(1);
    expect(wrapper.emitted().load[0]).toStrictEqual([endpoint]);
  });
});
